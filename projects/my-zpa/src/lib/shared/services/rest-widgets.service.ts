import { Injectable, inject } from '@angular/core';
import {
  DashboardTab,
  DashboardWidget,
} from '../models/dashboard-widget.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Widget } from '../models/widget.model';
import { InputParamsService } from './input-params.service';

@Injectable({
  providedIn: 'root',
})
export class RestWidgetsService {
  http = inject(HttpClient);
  constructor(private readonly inputParamsService: InputParamsService) {}

  getAvailableWidgets(): Observable<Widget[]> {
    const url = `${this.inputParamsService.sRestUrl()}dashboard-configuration/widget-overview`;
    return this.http.get<Widget[]>(url, { observe: 'response' }).pipe(
      map(result => result.body || []),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

  getDashboardWidgets(tab: DashboardTab): Observable<DashboardWidget[]> {
    const url = `${this.inputParamsService.sRestUrl()}dashboard/${tab}/widgets`;
    return this.http.get<DashboardWidget[]>(url, { observe: 'response' }).pipe(
      map(result => result.body || []),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

  save(
    widgets: DashboardWidget[],
    tab: DashboardTab
  ): Observable<DashboardWidget[]> {
    const url = `${this.inputParamsService.sRestUrl()}dashboard/${tab}/widgets`;
    return this.http
      .put<DashboardWidget[]>(url, widgets, { observe: 'response' })
      .pipe(
        map(result => result.body || []),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }
}
