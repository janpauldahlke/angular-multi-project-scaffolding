import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { IconPipe } from './shared/pipes/icon.pipe';
import { AsyncPipe, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { IdentityBarComponent } from './identity-bar/identity-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetOverviewComponent } from './widget-overview/widget-overview.component';
import { PatientInfoComponent } from './modal-components/patient-info/patient-info.component';
import { MenuComponent } from './menu/menu.component';
import {
  DashboardTab,
  DashboardWidget,
} from './shared/models/dashboard-widget.model';
import { Subject, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { WidgetsService } from './shared/services/widgets.service';
import { ErrorService } from './shared/services/error.service';
import { DataService } from './shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteDataService } from './shared/services/route-data.service';
import { AlertService } from './shared/services/alert/alert-service';
import { DragAndDropService } from './shared/services/drag-and-drop.service';
import { MessagingService } from './shared/services/messaging.service';
import { ModalService } from './shared/services/modal.service';
import { Widget } from './shared/models/widget.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-my-zpa',
  templateUrl: './my-zpa.component.html',
  styleUrls: ['./my-zpa.component.scss'],
  standalone: true,
  imports: [
    IconPipe,
    AsyncPipe,
    MenuComponent,
    ErrorComponent,
    IdentityBarComponent,
    DashboardComponent,
    WidgetOverviewComponent,
    PatientInfoComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase,
  ],
})
export class MyZpaComponent implements OnDestroy {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.hovered = '';
    this.modalService.hideModal();
  }

  @ViewChild(DashboardComponent) dashboardComponent?: DashboardComponent;

  activeRoute = DashboardTab.PatientOverview;

  isInConfigureMode = false;
  configurableWidgets: DashboardWidget[] = [];

  hovered = '';

  private readonly unsubscribe = new Subject();

  constructor(
    private readonly tabTitle: Title,
    public readonly widgetsService: WidgetsService,
    public readonly errorService: ErrorService,
    public readonly dataService: DataService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    public readonly routeDataService: RouteDataService,
    private readonly alertService: AlertService,
    public readonly dragAndDropService: DragAndDropService,
    private readonly messagingService: MessagingService,
    public readonly modalService: ModalService
  ) {
    dataService.patient$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(patient => {
        if (patient)
          tabTitle.setTitle(`${patient.firstName} ${patient.lastName}`);
      });

    messagingService.receiveMessages();

    this.activeRoute =
      MyZpaComponent.getCurrentRoute() || DashboardTab.PatientOverview;

    dragAndDropService.updateWidgets
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(widgets => {
        this.configurableWidgets = widgets;
      });

    this.handleSyncDuringConfigureMode();

    routeDataService.windowBackAndForwardEvents$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.disableFullscreenMode();
        this.toggleConfigureMode(false);
      });
  }

  handleSyncDuringConfigureMode(): void {
    this.widgetsService.dashboardWidgets$
      ?.pipe(takeUntil(this.unsubscribe))
      .subscribe(widgets => {
        this.configurableWidgets.forEach(cWidget => {
          const updatedWidget = widgets.find(
            widget => widget.widgetId === cWidget.widgetId
          );
          if (updatedWidget) {
            cWidget.name = updatedWidget.name;
            cWidget.url = updatedWidget.url;
            cWidget.associatedTopic = updatedWidget.associatedTopic;
          }
        });
      });
  }

  disableFullscreenMode(): void {
    if (this.dashboardComponent) {
      this.dashboardComponent.fullscreenWidget = undefined;
    }
  }

  toggleConfigureMode(startConfigureMode: boolean): void {
    // get snapshot of current widget when starting configure mode (only shallow copy)
    if (startConfigureMode && this.dashboardComponent) {
      this.configurableWidgets = [...this.dashboardComponent.widgets];
    }
    this.isInConfigureMode = startConfigureMode;
  }

  dragWidgetFromOverview(widget: Widget): void {
    const dashboardWidget = {
      ...widget,
      dashboardTab: this.activeRoute,
      width: widget.optimalWidth,
      height: widget.optimalHeight,
      row: 0,
      column: 0,
    };

    this.dragAndDropService.startDragging(
      dashboardWidget,
      this.dashboardComponent?.widgets || [],
      'drag'
    );
  }

  saveDashboardWidgets(): void {
    this.widgetsService.updateDashboardWidgets(this.configurableWidgets);
    this.configurableWidgets = [];
    this.toggleConfigureMode(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

  private static getCurrentRoute(): DashboardTab {
    return window.location.pathname.substring(1).split('/')[0] as DashboardTab;
  }
}
