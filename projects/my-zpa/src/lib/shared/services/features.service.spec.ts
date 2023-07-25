import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeaturesService } from './features.service';
import { InputParamsService } from './input-params.service';
import { of } from 'rxjs';

describe('FeatureService', () => {
  let service: FeaturesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FeaturesService,
        {provide: InputParamsService, useValue: {restUrl$: of('api/')}}
      ]
    });
    service = TestBed.inject(FeaturesService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set featureList on initialization', () => {
    const mockFeature = ['TestFeature'];

    http
    .expectOne({method: 'GET', url: 'api/admin/feature'})
    .flush(mockFeature, {status: 200, statusText: 'ok'});

    expect(service.cAvailableFeatures().includes(mockFeature[0])).toBe(true);
  });
});
