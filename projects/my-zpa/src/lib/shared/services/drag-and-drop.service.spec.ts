import {fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { DashboardTab, DashboardWidget } from '../models/dashboard-widget.model';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { DragAndDropService } from './drag-and-drop.service';

const STATE_DRAG = 'drag';
const STATE_RESIZE = 'resize';

fdescribe('DragAndDropService', () => {
  let service: DragAndDropService;
  let widgetFromSideBar: DashboardWidget;
  let dashboardWidgets: DashboardWidget[];
  let topLeftWidget: DashboardWidget;
  let topRightWidget: DashboardWidget;
  let bottomMiddleWidget: DashboardWidget;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastNoAnimationModule.forRoot({
        positionClass :'toast-bottom-right'
      })],
      providers: [DragAndDropService]
    });

    service = TestBed.inject(DragAndDropService);
    widgetFromSideBar = {widgetId: '1', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 0, column: 0, width: 3, height: 1, optimalWidth: 6, optimalHeight: 3};
    topLeftWidget = {widgetId: '2', dashboardTab: DashboardTab.PatientOverview, name: 'topLeft', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 1, column: 1, width: 4, height: 3, optimalWidth: 6, optimalHeight: 3};
    topRightWidget = {widgetId: '3', dashboardTab: DashboardTab.PatientOverview, name: 'topRight', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 1, column: 5, width: 4, height: 2, optimalWidth: 6, optimalHeight: 3};
    bottomMiddleWidget = {widgetId: '4', dashboardTab:DashboardTab.PatientOverview, name: 'bottomMiddle', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 4, column: 3, width: 4, height: 2, optimalWidth: 6, optimalHeight: 3};
    dashboardWidgets = [topLeftWidget, topRightWidget, bottomMiddleWidget];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set occupiedPositionsOnGrid, dragSource and dragTarget after 1ms on drag start', fakeAsync(() => {
    const widget = topLeftWidget;
    service.startDragging(widget, dashboardWidgets, STATE_DRAG);
    tick();
    service.updateDraggingState({row: widget.row, column: widget.column});

    expect(service['occupiedPositionsOnGrid'].length).toEqual(16);

    expect(service['dragSource']?.row).toEqual(widget.row);
    expect(service['dragSource']?.column).toEqual(widget.column);
  }));

  // OFFSET TESTS

  it('should calculate offset correctly', fakeAsync(() => {
    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: topLeftWidget.row, column: topLeftWidget.column});
    expect(service['offset']).toEqual({top: 0, left: 0, hasBeenSet: true});
    service.resetAllDragData();

    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: topLeftWidget.row + 1, column: topLeftWidget.column + 1});
    expect(service['offset']).toEqual({top: 1, left: 1, hasBeenSet: true});
  }));

  it('should set offset to middle if widget came from overview', fakeAsync(() => {
    service.startDragging(widgetFromSideBar, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: 3, column: 3});
    expect(service['offset']).toEqual({top: 0, left: 1, hasBeenSet: true});
  }));

  it('should not calculate offset on resize', fakeAsync(() => {
    service.startDragging(topLeftWidget, [], STATE_RESIZE);
    tick();
    service.updateDraggingState({row: 9, column: 8});
    expect(service['offset']).toEqual({top: 0, left: 0, hasBeenSet: false});
  }));

  it('should update position if widget is moved too fast ', fakeAsync(() => {
    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: 4, column: 5});
    expect(service['offset']).toEqual({top: 2, left: 3, hasBeenSet: true});
  }));

  // EDGE CASES TESTS

  it('should handle edge case - most left row', fakeAsync(() => {
    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: 1, column: 3});
    expect(service['offset']).toEqual({top: 0, left: 2, hasBeenSet: true});

    service.updateDraggingState({row: 1, column : 1});
    expect(service['dragTarget']?.row).toEqual(1);
    expect(service['dragTarget']?.column).toEqual(1);

    service.updateDraggingState({row: 3, column : 1});
    expect(service['dragTarget']?.row).toEqual(3);
    expect(service['dragTarget']?.column).toEqual(1);
  }));

  it('should handle edge case - top row', fakeAsync(() => {
    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: 3, column: 1});
    expect(service['offset']).toEqual({top: 2, left: 0, hasBeenSet: true});

    service.updateDraggingState({row: 1, column : 1});
    expect(service['dragTarget']?.row).toEqual(1);
    expect(service['dragTarget']?.column).toEqual(1);

    service.updateDraggingState({row: 1, column : 3});
    expect(service['dragTarget']?.row).toEqual(1);
    expect(service['dragTarget']?.column).toEqual(3);
  }));

  it('should handle edge case - most right row', fakeAsync(() => {
    service.startDragging(topRightWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: 1, column: 5});
    expect(service['offset']).toEqual({top: 0, left: 0, hasBeenSet: true});

    service.updateDraggingState({row: 1, column : 8});
    expect(service['dragTarget']?.row).toEqual(1);
    expect(service['dragTarget']?.column).toEqual(5);

    service.updateDraggingState({row: 3, column : 8});
    expect(service['dragTarget']?.row).toEqual(3);
    expect(service['dragTarget']?.column).toEqual(5);
  }));

  // DRAG TARGET TESTS

  it('should update dragTarget but not dragSource when hovering over available position', fakeAsync(() => {
    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: topLeftWidget.row, column: topLeftWidget.column});

    service.updateDraggingState({row: 1, column: 5});
    expect(service['dragTarget']?.row).toEqual(1);
    expect(service['dragTarget']?.column).toEqual(5);
    expect(service['dragSource']?.row).toEqual(topLeftWidget.row);
    expect(service['dragSource']?.column).toEqual(topLeftWidget.column);
  }));

  // DROP FUNCTIONALITY TESTS

  it('should move widget in dashboard', fakeAsync(() => {
    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: topLeftWidget.row, column: topLeftWidget.column});

    service.updateDraggingState({row:1, column: 5});
    service.resetAllDragData();

    service.updateWidgets.subscribe(widgets => {
      const updatedWidget = widgets.find(widget => widget.row === 1 && widget.column === 5);
      expect(updatedWidget).toBeDefined();
    });
  }));

  it('should add new widget to dashboard', fakeAsync(() => {
    service.startDragging(widgetFromSideBar, [], STATE_DRAG);
    tick();

    service.updateDraggingState({row: 6, column: 2});

    service.resetAllDragData();

    service.updateWidgets.subscribe( widgets => {
      expect(widgets.length).toEqual(dashboardWidgets.length + 1);
      const updatedWidget = widgets.find(widget =>
        // row = 6 - offset.top(0), column = 2 - offset.top(1)
        widget.row === 6 && widget.column === 1
      );
      expect(updatedWidget).toBeDefined();
    });
  }));

  it('should reset drag state', fakeAsync(() => {
    service.startDragging(widgetFromSideBar, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: 6, column: 2});
    service.resetAllDragData();
    expect(service['occupiedPositionsOnGrid'].length).toEqual(0);
    expect(service['dragSource']).toBeUndefined();
    expect(service['dragTarget']).toBeUndefined();
  }));

  it('should reset ongoing drag data if leaving browser window', fakeAsync(()=> {
    jest.spyOn(service, 'resetOngoingDragData');
    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: topLeftWidget.row, column: topLeftWidget.column});

    service.updateDraggingState({row: 6, column: 1});

    const dragLeaveEvent: DragEvent = <DragEvent>{
      clientX: 0,
      clientY: 0
    };

    service.leaveWindow(dragLeaveEvent);

    expect(service.resetOngoingDragData).toHaveBeenCalled();
    expect(topLeftWidget.row).toEqual(1);
    expect(topLeftWidget.column).toEqual(1);
  }));

  it('should resume to dragging state if enter browser window again with drag target', fakeAsync(() => {
    jest.spyOn(service, 'startDragging');
    service.startDragging(topLeftWidget, [], STATE_DRAG);
    tick();
    service.updateDraggingState({row: 6, column: 2});

    const dragLeaveEvent: DragEvent = <DragEvent>{
      clientX: 0,
      clientY: 0
    };

    service.leaveWindow(dragLeaveEvent);
    service.enterWindow();

    expect(service.startDragging).toHaveBeenCalled();
    expect(service.dragTarget?.row).toEqual(1);
    expect(service.dragTarget?.column).toEqual(1);
    flush();
  }));

  // MOVE WIDGETS OUT OF THE WAY TESTS

  it('should move other widget down', fakeAsync(() => {
    service.startDragging(topLeftWidget, dashboardWidgets, STATE_DRAG);
    tick();
    service.updateDraggingState({row: topLeftWidget.row, column: topLeftWidget.column});

    service.updateDraggingState({row:1, column: 5});
    const pushedWidget = service["allOtherWidgets"].find(widget => widget.name === topRightWidget.name);
    expect(pushedWidget?.row).toEqual(4);
    expect(pushedWidget?.column).toEqual(5);
  }));

  it('should move other widget right', fakeAsync(() => {
    service.startDragging(topLeftWidget, dashboardWidgets, STATE_DRAG);
    tick();
    service.updateDraggingState({row: topLeftWidget.row, column: topLeftWidget.column});

    service.updateDraggingState({row:4, column: 1});
    const pushedWidget = service["allOtherWidgets"].find(widget => widget.name === bottomMiddleWidget.name);
    expect(pushedWidget?.row).toEqual(4);
    expect(pushedWidget?.column).toEqual(5);
  }));

  it('should move other widget left', fakeAsync(() => {
    service.startDragging(topRightWidget, dashboardWidgets, STATE_DRAG);
    tick();
    service.updateDraggingState({row: topRightWidget.row, column: topRightWidget.column});

    service.updateDraggingState({row:4, column: 5});

    const pushedWidget = service["allOtherWidgets"].find(widget => widget.name === bottomMiddleWidget.name);
    expect(pushedWidget?.row).toEqual(4);
    expect(pushedWidget?.column).toEqual(1);
  }));

  it('should move multiple widgets out of the way', fakeAsync(() => {
    service.startDragging(topRightWidget, dashboardWidgets, STATE_DRAG);
    tick();
    service.updateDraggingState({row: topRightWidget.row, column: topRightWidget.column});

    service.updateDraggingState({row:1, column: 1});

    const firstPushedWidget = service["allOtherWidgets"].find(widget => widget.name === topLeftWidget.name);
    const secondPushedWidget = service["allOtherWidgets"].find(widget => widget.name === bottomMiddleWidget.name);
    expect(firstPushedWidget?.row).toEqual(3);
    expect(firstPushedWidget?.column).toEqual(1);
    expect(secondPushedWidget?.row).toEqual(4);
    expect(secondPushedWidget?.column).toEqual(5);
  }));

  it('should move widgets back once original position is free', fakeAsync(() => {
    service.startDragging(topRightWidget, dashboardWidgets, STATE_DRAG);
    tick();
    service.updateDraggingState({row: topRightWidget.row, column: topRightWidget.column});

    service.updateDraggingState({row:1, column: 1});

    let firstPushedWidget = service["allOtherWidgets"].find(widget => widget.name === topLeftWidget.name);
    let secondPushedWidget = service["allOtherWidgets"].find(widget => widget.name === bottomMiddleWidget.name);
    expect(firstPushedWidget?.row).toEqual(3);
    expect(firstPushedWidget?.column).toEqual(1);
    expect(secondPushedWidget?.row).toEqual(4);
    expect(secondPushedWidget?.column).toEqual(5);

    service.updateDraggingState({row: topRightWidget.row, column: topRightWidget.column});
    firstPushedWidget = service["allOtherWidgets"].find(widget => widget.name === topLeftWidget.name);
    secondPushedWidget = service["allOtherWidgets"].find(widget => widget.name === bottomMiddleWidget.name);
    expect(firstPushedWidget?.row).toEqual(1);
    expect(firstPushedWidget?.column).toEqual(1);
    expect(secondPushedWidget?.row).toEqual(4);
    expect(secondPushedWidget?.column).toEqual(3);
  }));

  it('should move widgets back one position at a time', fakeAsync(() => {
    service.startDragging(topRightWidget, dashboardWidgets, STATE_DRAG);
    tick();
    service.updateDraggingState({row: topRightWidget.row, column: topRightWidget.column});

    service.updateDraggingState({row:2, column: 4});

    let pushedWidget = service["allOtherWidgets"].find(widget => widget.name === topLeftWidget.name);
    expect(pushedWidget?.row).toEqual(4);
    expect(pushedWidget?.column).toEqual(1);

    service.updateDraggingState({row: 1, column: 4});
    pushedWidget = service["allOtherWidgets"].find(widget => widget.name === topLeftWidget.name);
    expect(pushedWidget?.row).toEqual(3);
    expect(pushedWidget?.column).toEqual(1);
  }));

  // RESIZE TESTS

  it('should validly make a widget bigger', fakeAsync(() => {
    dashboardWidgets.push(topLeftWidget);

    service.startDragging(topLeftWidget, [], STATE_RESIZE);
    tick();
    service.updateDraggingState({row: 5, column: 5});

    service.resetAllDragData()
    service.updateWidgets.subscribe( widgets => {
      const newWidget = widgets.find(widget => widget.row === 1 && widget.column === 1);

      expect(newWidget).toBeDefined();
      if(newWidget){
        expect(newWidget.width).toEqual(5);
        expect(newWidget.height).toEqual(5);
      }
    });
  }));

  it('should validly make a widget smaller', fakeAsync(() => {
    dashboardWidgets.push(topLeftWidget);

    service.startDragging(topLeftWidget, [], STATE_RESIZE);
    tick();
    service.updateDraggingState({row: 1, column: 1});

    service.resetAllDragData()
    service.updateWidgets.subscribe( widgets => {
      const newWidget = widgets.find(widget => widget.row === 1 && widget.column === 1);

      expect(newWidget).toBeDefined();
      if(newWidget){
        expect(newWidget.width).toEqual(1);
        expect(newWidget.height).toEqual(1);
      }
    });
  }));

  it('should not resize because grid columns are maximum 8', fakeAsync(() => {
    dashboardWidgets.push(topLeftWidget);

    service.startDragging(topLeftWidget, [], STATE_RESIZE);
    tick();
    service.updateDraggingState({row: 8, column: 9});
    expect(service['dragTarget']).toBeUndefined();

    service.resetAllDragData();
    service.updateWidgets.subscribe(widgets => {
      const newWidget = widgets.find(widget => widget.row === 1 && widget.column === 1);
      expect(newWidget).toBeDefined();
      if(newWidget){
        expect(newWidget.width).toEqual(4);
        expect(newWidget.height).toEqual(3);
      }
    });
  }));

  it('should not resize because of overlap', fakeAsync(() => {
    service.startDragging(topLeftWidget, dashboardWidgets, STATE_RESIZE);
    tick();
    service.updateDraggingState({row: 5, column: 5});
    expect(service['dragTarget']).toBeUndefined();

    service.resetAllDragData();
    service.updateWidgets.subscribe( widgets => {
      const newWidget = widgets.find(widget => widget.row === 1 && widget.column === 1);

      expect(newWidget).toBeDefined();
      if(newWidget){
        expect(newWidget.width).toEqual(4);
        expect(newWidget.height).toEqual(3);
      }
    });
  }));
});
