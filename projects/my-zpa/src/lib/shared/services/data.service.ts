import { Injectable } from '@angular/core';
import { map, shareReplay, switchMap } from 'rxjs';
import { mockPatients } from '../models/patient.model';
import { convertDtoToPatient } from '../models/ikarus-patient.model';
import { RestPatientService } from './rest-patient.service';
import { RouteDataService } from './route-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly ikarusPatient$ = this.routeDataService.queryParams$.pipe(
    switchMap(params =>
      this.restPatientService.getPatient(params.patientenId, params.iBSNR)
    ),
    shareReplay(1)
  );

  public readonly patient$ = this.ikarusPatient$.pipe(
    map(patient => patient ? convertDtoToPatient(patient) : undefined),
    shareReplay(1)
  );

  public readonly facility$ = this.ikarusPatient$.pipe(
    map(patient => patient?.Betriebstätte || ''),
    shareReplay(1)
  );

  public readonly patientList$ = this.routeDataService.queryParams$.pipe(
    map(params => mockPatients.map(
      patient => ({
        link: '',
        queryParams: {patientenId: params.patientenId || '', iBSNR: params.iBSNR || ''},
        text: patient.lastName + ', ' + patient.firstName + '; ' + patient.dateOfBirth
      })
    )),
    shareReplay(1)
  );

  constructor(private readonly routeDataService: RouteDataService,
              private readonly restPatientService: RestPatientService) {
  }
}
