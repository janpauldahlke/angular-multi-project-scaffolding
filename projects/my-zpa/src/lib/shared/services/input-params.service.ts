import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class InputParamsService {
  readonly sRestUrl = signal('api/');
  readonly restUrl$ = toObservable(this.sRestUrl);

  readonly sQueryParams = signal({patientenId: '', iBSNR: ''});
  readonly queryParams$ = toObservable(this.sQueryParams);

  constructor() {
  }
}
