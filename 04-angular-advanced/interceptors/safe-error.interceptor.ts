import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface UiHttpError {
  readonly status: number;
  readonly message: string;
}

export const safeErrorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((error: unknown) => {
      const status = error instanceof HttpErrorResponse ? error.status : 0;

      const safeError: UiHttpError = {
        status,
        message: status === 0
          ? 'Network error. Check your connection and try again.'
          : status >= 500
            ? 'The service is temporarily unavailable.'
            : 'The request could not be completed.'
      };

      return throwError(() => safeError);
    })
  );
