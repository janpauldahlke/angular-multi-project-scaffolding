import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {ToastrService, ToastNoAnimationModule } from 'ngx-toastr';
import {AlertService} from './alert-service';
import {CommonModule} from '@angular/common';

describe('NotificationService', () => {
  let alertService: AlertService,
    httpTestingController: HttpTestingController,
    toastrService: ToastrService

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, ToastNoAnimationModule.forRoot({
        positionClass :'toast-bottom-right'
      })],
      declarations: [],
      providers: [ToastrService],
    }).compileComponents();

    alertService = TestBed.inject(AlertService);
    httpTestingController = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);

  });

  it('should be created', () => {
    expect(alertService).toBeTruthy();
  });

  it('should test "showSuccessToast" method', () => {
    const spy = jest.spyOn(toastrService, 'success');
    alertService.successToast("test");
    expect(spy).toHaveBeenCalled();
  });

  it('should test "showWarningToast" method', () => {
    const spy = jest.spyOn(toastrService, 'warning');
    alertService.warningToast("test");
    expect(spy).toHaveBeenCalled();
  });

  it('should test "showWarningBanner" method', () => {
    const spy = jest.spyOn(toastrService, 'warning');
    alertService.warningBanner("test");
    expect(spy).toHaveBeenCalled();
  });

  it('should test "showErrorBanner" method', () => {
    const spy = jest.spyOn(toastrService, 'error');
    alertService.errorBanner("test");
    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
