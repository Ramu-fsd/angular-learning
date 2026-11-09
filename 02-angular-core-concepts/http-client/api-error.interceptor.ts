import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface SafeApiError {
  readonly status: number;
  readonly userMessage: string;
}

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((error: unknown) => {
      const status = error instanceof HttpErrorResponse ? error.status : 0;

      const safeError: SafeApiError = {
        status,
        userMessage: status === 0
          ? 'The service is currently unavailable. Please try again.'
          : status >= 500
            ? 'The service encountered an error. Please try again later.'
            : 'The request could not be completed. Check the details and try again.'
      };

      // Do not expose raw server messages or sensitive request details to the UI.
      return throwError(() => safeError);
    })
  );
