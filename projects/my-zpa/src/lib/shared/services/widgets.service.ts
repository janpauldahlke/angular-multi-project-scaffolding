import { Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  finalize,
  merge,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { DashboardWidget } from '../models/dashboard-widget.model';
import { RestWidgetsService } from './rest-widgets.service';
import { SynchronisationService } from './synchronisation.service';
import { RouteDataService } from './route-data.service';
import { AlertService } from './alert/alert-service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class WidgetsService {
  private readonly updateTriggers$ = this.dataService.patient$.pipe(
    switchMap(() => this.synchronisationService.intervalTimer$)
  );

  private readonly currentDashboardWidgets$ = this.updateTriggers$.pipe(
    withLatestFrom(this.routeDataService.activeDashboardTab$),
    switchMap(([_trigger, dashboardTab]) =>
      this.restWidgetsService
        .getDashboardWidgets(dashboardTab)
        .pipe(startWith([]))
    )
  );

  private readonly saveTrigger$ = new Subject<DashboardWidget[]>();

  private readonly updateDashboardWidgets$ = this.saveTrigger$.pipe(
    withLatestFrom(this.routeDataService.activeDashboardTab$),
    switchMap(([updatedWidgets, dashboardTab]) =>
      this.restWidgetsService
        .save(updatedWidgets, dashboardTab)
        .pipe(startWith([]))
    ),
    finalize(() => this.alertService.successToast('Konfiguration gespeichert'))
  );

  readonly dashboardWidgets$ = merge(
    this.currentDashboardWidgets$,
    this.updateDashboardWidgets$
  ).pipe(
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    shareReplay(1)
  );

  public allWidgets$ = this.synchronisationService.intervalTimer$.pipe(
    switchMap(() =>
      this.restWidgetsService.getAvailableWidgets().pipe(startWith([]))
    ),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    shareReplay(1)
  );

  constructor(
    private readonly restWidgetsService: RestWidgetsService,
    private readonly synchronisationService: SynchronisationService,
    private readonly routeDataService: RouteDataService,
    private readonly alertService: AlertService,
    private readonly dataService: DataService
  ) {}

  updateDashboardWidgets(updatedWidgets: DashboardWidget[]): void {
    this.saveTrigger$.next(updatedWidgets);
  }
}
