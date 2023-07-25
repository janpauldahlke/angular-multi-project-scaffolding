import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { IkarusPatient } from '../models/ikarus-patient.model';
import { InputParamsService } from './input-params.service';

@Injectable({
  providedIn: 'root'
})
export class RestPatientService {
  constructor(private readonly http: HttpClient,
              private readonly inputParamsService: InputParamsService) {
  }

  getPatient(patientenId: string, iBSNR: string): Observable<IkarusPatient|null> {
    const url = `${this.inputParamsService.sRestUrl()}patient/${patientenId}/${iBSNR}`;
    return this.http.get<IkarusPatient|null>(url, {observe: 'response'}).pipe(
      map(result => result.body),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }
}
