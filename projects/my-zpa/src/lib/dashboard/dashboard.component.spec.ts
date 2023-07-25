import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { GridSlotsPipe } from '../shared/pipes/grid-slots.pipe';
import { GridAreaStylesPipe } from '../shared/pipes/grid-area-styles.pipe';
import {SafeUrlPipe} from "../shared/pipes/safe-url.pipe";
import { WidgetComponent } from './widget/widget.component';
import { DashboardTab } from '../shared/models/dashboard-widget.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, GridSlotsPipe, GridAreaStylesPipe, WidgetComponent, SafeUrlPipe],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.widgets = [
      {widgetId: '1', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 1, column: 1, width: 2, height: 2, optimalWidth: 6, optimalHeight: 3},
      {widgetId: '2', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 1, column: 3, width: 2, height: 2, optimalWidth: 6, optimalHeight: 3},
      {widgetId: '3', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 3, column: 1, width: 2, height: 2, optimalWidth: 6, optimalHeight: 3},
      {widgetId: '4', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 3, column: 3, width: 2, height: 2, optimalWidth: 6, optimalHeight: 3},
      {widgetId: '5', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 4, column: 4, width: 2, height: 2, optimalWidth: 6, optimalHeight: 3}
    ];
  });

  it('should remove widget based on position', () => {
    const widgetToRemove = {widgetId: '3', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 3, column: 1, width: 2, height: 2, optimalWidth: 6, optimalHeight: 3};

    component.removeWidget(widgetToRemove);

    const filteredWidgets = component.widgets.filter(widget => widget.row !== widgetToRemove.row || widget.column !== widgetToRemove.column);
    component.updateConfigurableWidgets.subscribe(emittedWidgets => expect(emittedWidgets).toEqual(filteredWidgets));
  });
});
