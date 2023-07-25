import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly errorService: ErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((portalError: HttpErrorResponse) => {
        console.log(portalError)
        // if portalError.error.error exists, this error is non of our caught errors.
        if ( !portalError.error.error ) {
          this.errorService.newError(portalError.error, true);
        } else {
          this.errorService.newError({
              affectedService: "Portal",
              code: portalError.status.toString(),
              technicalDescription: portalError.message,
              timeOfOccurrence: portalError.error.timestamp,
              userAccount: "",
              verboseDescription: portalError.statusText
            }, true

          )
        }

        return throwError(() => portalError);
      })
    );
  }
}
