import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { DataService } from './data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouteDataService } from './route-data.service';
import { RestPatientService } from './rest-patient.service';
import { of } from 'rxjs';
import { mockIkarusPatient, mockIkarusPatientAsPatient } from '../models/ikarus-patient.model';

const MockRouteDataService = {
  queryParams$: of({patientenId: 'xyz', iBSNR: 'abc'})
};
const MockRestPatientService = {
  getPatient: () => of(mockIkarusPatient)
};

describe('DataService', () => {
  let service: DataService;
  let routeDataService: RouteDataService;
  let restPatientService: RestPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ToastNoAnimationModule.forRoot({
        positionClass: 'toast-bottom-right'
      })],
      providers: [DataService,
        {provide: RouteDataService, useValue: MockRouteDataService},
        {provide: RestPatientService, useValue: MockRestPatientService}
      ]
    });
    service = TestBed.inject(DataService);
    routeDataService = TestBed.inject(RouteDataService);
    restPatientService = TestBed.inject(RestPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get on intervalTimer$ usage', fakeAsync(() => {
    routeDataService.queryParams$.subscribe(params => expect(params).toEqual({patientenId: 'xyz', iBSNR: 'abc'}));
    restPatientService.getPatient('xyz', 'abc').subscribe(patient => expect(patient).toEqual(mockIkarusPatient));
    service.patient$.subscribe(patient => expect(patient).toEqual(mockIkarusPatientAsPatient));
    tick();
    flush();
  }));
});
