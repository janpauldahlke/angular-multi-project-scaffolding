import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take, timer } from 'rxjs';
import { InputParamsService } from './input-params.service';

@Injectable({
  providedIn: 'root',
})
export class SynchronisationService {
  private readonly syncInterval$ = this.inputParamsService.restUrl$.pipe(
    switchMap(url =>
      this.http
        .get<number>(url + 'admin/synchronisation', { observe: 'response' })
        .pipe(
          map(res => res.body || 60000),
          take(1)
        )
    )
  );

  readonly intervalTimer$ = this.syncInterval$.pipe(
    switchMap(interval => timer(1, interval))
  );

  constructor(
    private readonly http: HttpClient,
    private readonly inputParamsService: InputParamsService
  ) {}
}
