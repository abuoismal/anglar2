import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

// Custom HTTP interceptor to show/hide spinner during HTTP requests
export const myloadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  // Show spinner before sending the request
  spinner.show();

  return next(req).pipe(
    // Hide spinner when request completes (success or error)
    finalize(() => {
      spinner.hide();
    })
  );
};
