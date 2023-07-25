import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetOverviewComponent } from './widget-overview.component';
import { DashboardTab } from '../shared/models/dashboard-widget.model';
import { FormsModule } from '@angular/forms';
import { SortPipe } from '../shared/pipes/sort.pipe';
import { IconPipe } from '../shared/pipes/icon.pipe';
import { FilterByNamePipe } from '../shared/pipes/filter-by-name.pipe';
import { FilterByTopicsPipe } from '../shared/pipes/filter-by-topics.pipe';

describe('WidgetOverviewComponent', () => {
  let component: WidgetOverviewComponent;
  let fixture: ComponentFixture<WidgetOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, WidgetOverviewComponent, FilterByNamePipe, FilterByTopicsPipe, SortPipe, IconPipe],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should automatically trigger groupWidgetsByUsage() on set configurableWidgets', () => {
    const spy = jest.spyOn(component, 'groupWidgetsByUsage');
    component.configurableWidgets = [];
    expect(spy).toHaveBeenCalled();
  });

  it('should split widgets into newWidgets and widgetsInUse', () => {
    component.availableWidgets = [
      {
        widgetId: '1',
        name: 'Medizinische Patientenhistorie1',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '2',
        name: 'Medizinische Patientenhistorie2',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '3',
        name: 'Medizinische Patientenhistorie3',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '4',
        name: 'Medizinische Patientenhistorie4',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '5',
        name: 'Medizinische Patientenhistorie5',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        optimalWidth: 6,
        optimalHeight: 3
      }
    ];

    component.configurableWidgets = [
      {
        widgetId: '1',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Medizinische Patientenhistorie1',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        row: 1,
        column: 1,
        width: 2,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '2',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Medizinische Patientenhistorie2',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        row: 1,
        column: 3,
        width: 2,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      }
    ];

    expect(component.newWidgets.length).toEqual(3);
    expect(component.widgetsInUse.length).toEqual(2);
  });
});
