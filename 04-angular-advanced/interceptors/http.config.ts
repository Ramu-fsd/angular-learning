import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  correlationIdInterceptor
} from './correlation-id.interceptor';
import {
  safeErrorInterceptor
} from './safe-error.interceptor';

export const httpConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([
      correlationIdInterceptor,
      safeErrorInterceptor
    ]))
  ]
};
