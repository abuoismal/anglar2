import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, finalize } from 'rxjs';

/**
 * HTTP interceptor to show a loading spinner during HTTP requests.
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Show the spinner before the request is sent
    this.spinner.show();

    return next.handle(req).pipe(
      // Hide the spinner when the request completes (success or error)
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
