import { Injectable } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(/*private readonly toastr: ToastrService*/) {}

  public successToast(message: string, title?: string) {

    const options = {
      tapToDismiss: true,
      timeOut: 4000,
      //positionClass: "toast-top-right"
    };

    //this.toastr.success(message, title, options);
  }

  public warningToast(message: string, title?: string) {

    const options = {
      tapToDismiss: true,
      disableTimeOut: true,
      //positionClass: "toast-top-right"
    };

    //this.toastr.warning(message, title, options);
  }

  public errorBanner(message: string, title?: string) {
    const options = {
      tapToDismiss: true,
      disableTimeOut: true,
      //toastClass: "banner",
      //messageClass: "banner-message",
      //positionClass: "banner-width100"
    };

    //this.toastr.error(message, title, options);
  }

  public warningBanner(message: string, title?: string) {
    const options = {
      tapToDismiss: true,
      disableTimeOut: true,
      //toastClass: "banner",
      //messageClass: "banner-message",
      //positionClass: "banner-width100",
      //closeButton: true
    };

    //this.toastr.warning(message, title, options);
  }
}
