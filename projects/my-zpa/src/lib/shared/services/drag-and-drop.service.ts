import { Injectable } from '@angular/core';
import { DashboardWidget, WidgetPosition } from '../models/dashboard-widget.model';
import { Subject } from 'rxjs';

interface DashboardWidgetWithIndex extends DashboardWidget {
  index: number;
}

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  public maxColumns = 8;

  public action?: 'drag'|'resize';
  private originalWidgets: DashboardWidget[] = [];
  private allOtherWidgets: DashboardWidgetWithIndex[] = [];
  // only needed for resizing
  private occupiedPositionsOnGrid: WidgetPosition[] = [];

  private dragSource?: DashboardWidget;
  private offset = {top: 0, left: 0, hasBeenSet: false};

  private _updateWidgets: Subject<DashboardWidget[]> = new Subject();
  public updateWidgets = this._updateWidgets.asObservable();

  public dragTarget?: DashboardWidget;
  public hoveredPositionsOfDragTarget: WidgetPosition[] = [];
  private movedWidgets: {originalWidget: DashboardWidgetWithIndex, positionHistory: WidgetPosition[]}[] = [];

  // angular rerender triggers dragEnter multiple times, which we need to prevent
  private lastDragEnterPosition?: WidgetPosition;

  // checks if user dragged widget outside of window
  private outside = false;

  // drop widget if it leaves the browser window
  leaveWindow(event: DragEvent): void {
    if (event.clientX <= 0 || event.clientX >= window.innerWidth || event.clientY <= 0 || event.clientY >= window.innerHeight) {
      this.outside = true;
      this._updateWidgets.next(this.originalWidgets);
      this.resetOngoingDragData();
    }
  }

  // resume dragging mode if widget was not dropped
  enterWindow(): void {
    if (this.outside) {
      this.outside = false;
      this.setDragTargetBackToDragSource();
    }
  }

  setDragTargetBackToDragSource(): void {
    if (this.action && this.dragSource) {
      this._updateWidgets.next(this.originalWidgets);
      this.startDragging(this.dragSource, this.originalWidgets, this.action);

      if (this.dragSourceIsFromOverview()) {
        this.resetOngoingDragData();
      } else if (this.dragTarget?.row !== this.dragSource.row || this.dragTarget?.column !== this.dragSource.column) {
        let row = this.dragSource.row + this.offset.top;
        let column = this.dragSource.column + this.offset.left;

        if (this.action === 'resize') {
          row += this.dragSource.height - 1;
          column += this.dragSource.width - 1;
        }

        this.updateDraggingState({row, column});
      }
    }
  }

  // calculates occupied fields on grid and initializes dragSource with widget data
  startDragging(draggingWidget: DashboardWidget, allWidgets: readonly DashboardWidget[], action: 'drag'|'resize'): void {
    this.originalWidgets = [...allWidgets];
    this.action = action;
    this.allOtherWidgets = [
      ...allWidgets
      .filter(w => w.row !== draggingWidget.row || w.column !== draggingWidget.column)
      .map((w, index) => ({...w, index}))
    ];
    this.occupiedPositionsOnGrid = this.allOtherWidgets.map(widget => DragAndDropService.getPositionsOfWidget(widget)).flat();

    // short delay to save drag preview before changing styles
    setTimeout(() => {
      this.dragSource = {...draggingWidget};
    });
  }

  // updates dragTarget if hovered position is valid
  // returns updated board with widgets that were moved out of the way
  updateDraggingState(position: WidgetPosition): void {
    if (!this.lastDragEnterPosition || (this.lastDragEnterPosition.row !== position.row || this.lastDragEnterPosition.column !== position.column)) {
      position = {...position};
      this.lastDragEnterPosition = {...position};

      if (this.action === 'drag') {
        if (!this.offset.hasBeenSet) {
          this.calculateOffset(position);
        }
        this.checkForEdgeCases(position);
      }

      const dragTarget = this.buildDragTarget(position.row, position.column);
      if (!dragTarget) return;
      const hoverTargetPositions = DragAndDropService.getPositionsOfWidget(dragTarget);

      if (this.action === 'resize' && !this.hasOnlyValidPositions(hoverTargetPositions)) {
        return;
      }

      this.dragTarget = {...dragTarget};
      this.hoveredPositionsOfDragTarget = [...hoverTargetPositions];

      if (this.action === 'drag') {
        this.moveWidgetsOutOfTheWay();
      }

      this._updateWidgets.next(this.dragTarget ? [...this.allOtherWidgets, this.dragTarget] : this.allOtherWidgets);
    }
  }

  // calculates from which part of the widget it was dragged
  // if widget came from overview this just returns the center
  private calculateOffset(position: WidgetPosition): void {
    if (this.dragSource) {
      // catch edge case of user dragging too fast at start of drag
      const positions = DragAndDropService.getPositionsOfWidget(this.dragSource);
      if (!positions.includes(position)) {
        const sortedPositions = positions.sort((a, b) =>
          Math.abs(a.row - position.row) + Math.abs(a.column - position.column) - (Math.abs(b.row - position.row) + Math.abs(b.column - position.column)));
        position = sortedPositions[0];
      }

      if (this.dragSourceIsFromOverview()) {
        this.offset = {
          top: Math.ceil(this.dragSource.height / 2) - 1,
          left: Math.ceil(this.dragSource.width / 2) - 1,
          hasBeenSet: true
        };
      } else {
        this.offset = {
          top: position.row - this.dragSource.row,
          left: position.column - this.dragSource.column,
          hasBeenSet: true
        };
      }

    }
  }

  private checkForEdgeCases(position: WidgetPosition): void {
    // handle most left row
    if (this.offset.left >= position.column) {
      position.column = this.offset.left + 1;
    }
    // handle top row
    if (this.offset.top >= position.row) {
      position.row = this.offset.top + 1;
    }
    // handle most right row
    if (this.dragSource) {
      const offsetRight = this.dragSource.width - this.offset.left - 1;
      const distanceToTheRight = this.maxColumns - position.column;
      if (offsetRight >= distanceToTheRight) {
        position.column = this.maxColumns - offsetRight;
      }
    }
  }

  private moveWidgetsOutOfTheWay(): void {
    this.moveWidgetsBackIfPossible();
    this.moveOtherWidgetsIfNecessary();
  }

  private moveWidgetsBackIfPossible(): void {
    // if widgets got moved back, there might be new space for other widgets to move back -> so we repeat the process just in case
    let movedBackWidgets = true;
    while (movedBackWidgets) {
      movedBackWidgets = false;

      this.movedWidgets = this.movedWidgets.filter(movedWidget => {
        let foundFreePositionToMoveBackTo = false;
        movedWidget.positionHistory.forEach((position, index) => {
          if (!foundFreePositionToMoveBackTo && index !== movedWidget.positionHistory.length - 1) {
            const widgetOnPreviousPosition = {
              ...movedWidget.originalWidget,
              row: position.row,
              column: position.column
            };

            if (!this.widgetOverlapsWithOtherWidgets(widgetOnPreviousPosition)) {
              const allWidgetsWithoutMovedWidget = this.allOtherWidgets.filter(widget => widget.index !== movedWidget.originalWidget.index);
              this.allOtherWidgets = [...allWidgetsWithoutMovedWidget, {
                ...movedWidget.originalWidget,
                row: position.row,
                column: position.column
              }];
              foundFreePositionToMoveBackTo = true;
              movedWidget.positionHistory = movedWidget.positionHistory.slice(0, index + 1);
              movedBackWidgets = true;
            }
          }
        });
        return movedWidget.positionHistory.length > 1;
      });
    }
  }

  private widgetOverlapsWithOtherWidgets(widget: DashboardWidgetWithIndex): boolean {
    let overlap = !!this.dragTarget && this.doWidgetsOverlap(widget, this.dragTarget);
    this.allOtherWidgets.forEach(w => {
      if (widget.index !== w.index && this.doWidgetsOverlap(widget, w)) {
        overlap = true;
      }
    });
    return overlap;
  }

  private moveOtherWidgetsIfNecessary(): void {
    if (!this.dragTarget) return;
    let movedWidgets: DashboardWidgetWithIndex[] = [{...this.dragTarget, index: -1}];
    while (movedWidgets.length) {
      let widgetsToMove: {widgetToMove: DashboardWidgetWithIndex, widgetsBeingBlocked: DashboardWidgetWithIndex[]}[] = [];

      this.findWidgetsToMove(movedWidgets, widgetsToMove);
      movedWidgets = this.moveWidgets(widgetsToMove);

      this.allOtherWidgets = this.allOtherWidgets.map(otherWidget => {
        const movedWidget = movedWidgets.find(widget => widget.index === otherWidget.index);
        return movedWidget || otherWidget;
      });
    }
  }

  private findWidgetsToMove(movedWidgets: DashboardWidgetWithIndex[],
                            widgetsToMove: {widgetToMove: DashboardWidgetWithIndex, widgetsBeingBlocked: DashboardWidgetWithIndex[]}[]): void {
    movedWidgets.forEach(movedWidget => {
      this.allOtherWidgets.forEach(otherWidget => {
        if (otherWidget.index === movedWidget.index) {
          return;
        }

        const overlap = this.doWidgetsOverlap(movedWidget, otherWidget);
        if (overlap) {
          const widgetToBeMoved = widgetsToMove.find(widget => widget.widgetToMove.index === otherWidget.index);
          if (widgetToBeMoved) {
            widgetToBeMoved.widgetsBeingBlocked.push(movedWidget);
          } else {
            widgetsToMove.push({widgetToMove: {...otherWidget}, widgetsBeingBlocked: [{...movedWidget}]});
          }
        }
      });
    });
  }

  private moveWidgets(widgetsToMove: {widgetToMove: DashboardWidgetWithIndex, widgetsBeingBlocked: DashboardWidgetWithIndex[]}[]): DashboardWidgetWithIndex[] {
    const newlyPlacedWidgets: DashboardWidget[] = [];
    return widgetsToMove.map(widgetToMove => {
      const widgetPositions = DragAndDropService.getPositionsOfWidget(widgetToMove.widgetToMove);
      const blockedPositions = [...widgetToMove.widgetsBeingBlocked, ...newlyPlacedWidgets].map(widget => DragAndDropService.getPositionsOfWidget(widget)).flat();
      const moveData = this.calculateDirectionToMoveWidgetIn(blockedPositions, widgetPositions);
      const positions = DragAndDropService.calculateMovedWidgetPositions(widgetToMove.widgetToMove, moveData);

      const alreadyMovedWidget = this.movedWidgets.find(widget => widget.originalWidget.index === widgetToMove.widgetToMove.index);
      if (alreadyMovedWidget) {
        alreadyMovedWidget.positionHistory.push(...positions);
      } else {
        this.movedWidgets.push({
          originalWidget: {...widgetToMove.widgetToMove},
          positionHistory: [{
            row: widgetToMove.widgetToMove.row,
            column: widgetToMove.widgetToMove.column
          }, ...positions]
        });
      }

      const lastPosition = positions[positions.length - 1];
      newlyPlacedWidgets.push({...widgetToMove.widgetToMove, row: lastPosition.row, column: lastPosition.column});
      return {...widgetToMove.widgetToMove, row: lastPosition.row, column: lastPosition.column};
    });
  }

  private calculateDirectionToMoveWidgetIn(blockedPositions: WidgetPosition[], widgetToMovePositions: WidgetPosition[]): {direction: 'left'|'right'|'down', distance: number} {
    // using Set to remove duplicates
    const rowsOfWidgetToMove = [...new Set(widgetToMovePositions.map(pos => pos.row))].sort((a, b) => a - b);
    const relevantBlockedPositions = blockedPositions.filter(pos => rowsOfWidgetToMove.includes(pos.row));
    const blockedColumns = [...new Set(relevantBlockedPositions.map(pos => pos.column))].sort((a, b) => a - b);

    const mostLeftBlockedColumn = blockedColumns[0];
    const mostRightBlockedColumn = blockedColumns[blockedColumns.length - 1];

    const columnsOfWidgetToMove = [...new Set(widgetToMovePositions.map(pos => pos.column))].sort((a, b) => a - b);
    const mostLeftWidgetToMoveColumn = columnsOfWidgetToMove[0];
    const mostRightWidgetToMoveColumn = columnsOfWidgetToMove[columnsOfWidgetToMove.length - 1];

    const dragTargetPositions = this.dragTarget ? DragAndDropService.getPositionsOfWidget(this.dragTarget) : [];
    const dragTargetColumns = dragTargetPositions.filter(pos => rowsOfWidgetToMove.includes(pos.row)).map(pos => pos.column).sort((a, b) => a - b);
    const dragTargetLeftOfWidgetToMove = dragTargetColumns.includes(widgetToMovePositions[0].column);
    const dragTargetRightOfWidgetToMove = dragTargetColumns.includes(widgetToMovePositions[widgetToMovePositions.length - 1].column);

    const enoughSpaceToTheLeft = mostLeftBlockedColumn - 1 >= columnsOfWidgetToMove.length;
    const enoughSpaceToTheRight = this.maxColumns - mostRightBlockedColumn >= columnsOfWidgetToMove.length;

    const shouldMoveToTheLeft = blockedColumns.includes(mostRightWidgetToMoveColumn) && !blockedColumns.includes(mostLeftWidgetToMoveColumn) && !dragTargetLeftOfWidgetToMove;
    const shouldMoveToTheRight = blockedColumns.includes(mostLeftWidgetToMoveColumn) && !blockedColumns.includes(mostRightWidgetToMoveColumn) && !dragTargetRightOfWidgetToMove;

    const columnOverlap = blockedColumns.filter(column => columnsOfWidgetToMove.includes(column));

    if (enoughSpaceToTheLeft && shouldMoveToTheLeft) {
      return {direction: 'left', distance: columnOverlap.length};
    } else if (enoughSpaceToTheRight && shouldMoveToTheRight) {
      return {direction: 'right', distance: columnOverlap.length};
    } else {
      const relevantBlockedPositions = blockedPositions.filter(pos => columnsOfWidgetToMove.includes(pos.column));
      const blockedRows = [...new Set(relevantBlockedPositions.map(pos => pos.row))].sort((a, b) => a - b);
      const lowestBlockedRow = blockedRows[blockedRows.length - 1];

      return {direction: 'down', distance: lowestBlockedRow + 1 - rowsOfWidgetToMove[0]};
    }
  }

  private static calculateMovedWidgetPositions(widget: DashboardWidget, moveData: {direction: 'left'|'right'|'down', distance: number}): {row: number, column: number}[] {
    const positions = [];
    for (let distance = 1; distance <= moveData.distance; distance++) {
      if (moveData.direction === 'left') {
        positions.push({row: widget.row, column: widget.column - distance});
      } else if (moveData.direction === 'right') {
        positions.push({row: widget.row, column: widget.column + distance});
      } else {
        positions.push({row: widget.row + distance, column: widget.column});
      }
    }
    return positions;
  }

  private buildDragTarget(row: number, column: number): DashboardWidget|undefined {
    if (!this.dragSource) return undefined;

    if (this.action === 'drag') {
      return {...this.dragSource, row: row - this.offset.top, column: column - this.offset.left};
    } else if (this.action === 'resize') {
      return {
        ...this.dragSource,
        width: Math.max(1, column + 1 - this.dragSource.column),
        height: Math.max(1, row + 1 - this.dragSource.row)
      };
    }

    return {...this.dragSource, row, column};
  }

  resetAllDragData(): void {
    this.resetInitialDragData();
    this.resetOngoingDragData();
  }

  resetInitialDragData(): void {
    this.action = undefined;
    this.originalWidgets = [];
    this.allOtherWidgets = [];
    this.occupiedPositionsOnGrid = [];
    this.dragSource = undefined;
    this.offset = {top: 0, left: 0, hasBeenSet: false};
    this.outside = false;
  }

  resetOngoingDragData(): void {
    this.lastDragEnterPosition = undefined;
    this.dragTarget = undefined;
    this.hoveredPositionsOfDragTarget = [];
    this.movedWidgets = [];
  }

  dragSourceIsFromOverview(): boolean {
    return !!this.dragSource && this.dragSource.row === 0 && this.dragSource.column === 0;
  }

  private hasOnlyValidPositions(hoverTargetPositions: WidgetPosition[]): boolean {
    return !this.doPositionsOverlap(this.occupiedPositionsOnGrid, hoverTargetPositions)
      && !this.includesPositionsOutsideOfGrid(hoverTargetPositions);
  }

  private doWidgetsOverlap(widget1: DashboardWidget, widget2: DashboardWidget): boolean {
    return this.doPositionsOverlap(DragAndDropService.getPositionsOfWidget(widget1), DragAndDropService.getPositionsOfWidget(widget2));
  }

  private doPositionsOverlap(positions1: WidgetPosition[], positions2: WidgetPosition[]): boolean {
    return positions1.some(pos => positions2.find(p => p.row === pos.row && p.column === pos.column));
  }

  private includesPositionsOutsideOfGrid(positions: WidgetPosition[]): boolean {
    return positions.some(pos => pos.row < 1 || pos.column < 1 || pos.column > this.maxColumns);
  }

  private static getPositionsOfWidget(widget: DashboardWidget): WidgetPosition[] {
    const occupiedPositions = [];
    for (let row = widget.row; row < widget.row + widget.height; row++) {
      for (let column = widget.column; column < widget.column + widget.width; column++) {
        occupiedPositions.push({row, column});
      }
    }
    return occupiedPositions;
  }
}
