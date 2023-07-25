import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DashboardWidget} from '../shared/models/dashboard-widget.model';
import {DragAndDropService} from '../shared/services/drag-and-drop.service';
import {IconPipe} from "../shared/pipes/icon.pipe";
import {WidgetComponent} from "./widget/widget.component";
import {GetPositionPipe} from "../shared/pipes/get-position.pipe";
import {GridSlotsPipe} from "../shared/pipes/grid-slots.pipe";
import {IsHoveredPipe} from "../shared/pipes/is-hovered.pipe";
import {WidgetsEqualPipe} from "../shared/pipes/widgets-equal.pipe";
import {GridAreaStylesPipe} from "../shared/pipes/grid-area-styles.pipe";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    WidgetComponent,
    IconPipe,
    GetPositionPipe,
    GridSlotsPipe,
    IsHoveredPipe,
    WidgetsEqualPipe,
    GridAreaStylesPipe,
    NgFor,
    NgIf,
  ]
})
export class DashboardComponent {

  @Input() widgets: DashboardWidget[] = [];
  @Input() isInConfigureMode = false;
  @Output() updateConfigurableWidgets = new EventEmitter<DashboardWidget[]>();
  columnAmount = 8;
  fullscreenWidget?: DashboardWidget;

  hideWidget?: DashboardWidget;

  constructor(public readonly dragAndDropService: DragAndDropService) {}

  removeWidget(widgetToRemove: DashboardWidget): void {
    const filteredWidgets = this.widgets.filter(widget => widget.row !== widgetToRemove.row || widget.column !== widgetToRemove.column);
    this.updateConfigurableWidgets.emit(filteredWidgets);
  }

  dragStart(widget: DashboardWidget, action: 'drag' | 'resize'): void {
    this.dragAndDropService.resetAllDragData();
    this.dragAndDropService.startDragging(widget, this.widgets, action);
  }
}
