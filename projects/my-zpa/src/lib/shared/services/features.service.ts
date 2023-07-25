import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { InputParamsService } from './input-params.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  readonly availableFeatures$ = this.inputParamsService.restUrl$.pipe(
    switchMap(url => this.http.get<string[]>(url + 'admin/feature', {observe: 'response'}).pipe(
      map(res => res.body || []),
      take(1)
    ))
  );

  cAvailableFeatures = toSignal(this.availableFeatures$, {initialValue: [] as string[]});

  constructor(private readonly http: HttpClient, private readonly inputParamsService: InputParamsService) {
  }
}
