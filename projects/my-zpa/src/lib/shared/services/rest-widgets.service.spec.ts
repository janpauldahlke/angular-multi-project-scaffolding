import { TestBed } from '@angular/core/testing';
import { RestWidgetsService } from './rest-widgets.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardTab, DashboardWidget } from '../models/dashboard-widget.model';
import { AlertService } from './alert/alert-service';


describe('RestWidgetsService', () => {
  let service: RestWidgetsService;
  let http: HttpTestingController;
  let result: Object;
  let exampleWidgets: DashboardWidget[] = [];

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastNoAnimationModule.forRoot({
        positionClass: 'toast-bottom-right'
      })],
      providers: [RestWidgetsService, AlertService, ToastrService]
    });

    service = TestBed.inject(RestWidgetsService);
    http = TestBed.inject(HttpTestingController);
    result = [];

    exampleWidgets = [
      {
        widgetId: '1',
        dashboardTab: DashboardTab.MedicalPatientHistory,
        name: 'Widget1',
        description: 'Text',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: '',
        url: '',
        row: 1,
        column: 3,
        width: 4,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '2',
        dashboardTab: DashboardTab.MedicalPatientHistory,
        name: 'Widget2',
        description: 'Text',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: '',
        url: '',
        row: 3,
        column: 3,
        width: 2,
        height: 1,
        optimalWidth: 2,
        optimalHeight: 1
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAvailableWidgets should return 200', () => {
    const subscription = service.getAvailableWidgets()
    .subscribe(response => result = response);

    http
    .expectOne({method: 'GET', url: 'api/dashboard-configuration/widget-overview'})
    .flush(exampleWidgets, {status: 200, statusText: 'ok'});

    expect(result).toEqual(exampleWidgets);
    http.verify();
    subscription.unsubscribe();
  });

  it('getAvailableWidgets should return empty array when 404', () => {
    const subscription = service.getAvailableWidgets()
    .subscribe(response => result = response);

    http
    .expectOne({method: 'GET', url: 'api/dashboard-configuration/widget-overview'})
    .flush(null, {status: 404, statusText: 'not-found'});
    expect(result).toEqual([]);
    http.verify();
    subscription.unsubscribe();
  });

  it('getDashboardWidgets should return 200', () => {
    const subscription = service.getDashboardWidgets(DashboardTab.PatientOverview)
    .subscribe(response => result = response);


    http
    .expectOne({method: 'GET', url: 'api/dashboard/patient-overview/widgets'})
    .flush({status: 200});
    expect(result).toEqual({status: 200});
    http.verify();
    subscription.unsubscribe();
  });

  it('save should return 200', () => {
    const subscription = service.save(exampleWidgets, DashboardTab.MedicalPatientHistory)
    .subscribe(response => result = response);

    http
    .expectOne({method: 'PUT', url: 'api/dashboard/medical-history/widgets'})
    .flush({status: 200});
    expect(result).toEqual({status: 200});
    http.verify();
    subscription.unsubscribe();
  });*/
});
