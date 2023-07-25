import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { AlertService } from './alert/alert-service';
import {PortalError} from "../models/portal-error.model";

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements OnDestroy{

  constructor(private readonly alertService: AlertService) {
  }
  private error: BehaviorSubject<PortalError | null> = new BehaviorSubject<PortalError | null>(null);

  error$: Observable<PortalError | null> = this.error.asObservable();

  newError(errorObject: PortalError, navigate = false): void {
    if (navigate) {
       this.error.next(errorObject);
    } else {
       this.alertService.errorBanner(errorObject.verboseDescription);
    }
  }

  ngOnDestroy(): void {
    this.error.complete();
  }
}
