# HTTP interceptors and error handling

Functional interceptor example adding a request correlation ID:

```ts
import { HttpInterceptorFn } from '@angular/common/http';

export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationId = crypto.randomUUID();
  return next(req.clone({
    setHeaders: { 'X-Correlation-ID': correlationId }
  }));
};
```

Register it with `provideHttpClient(withInterceptors([correlationIdInterceptor]))`.

For a bearer token interceptor, obtain the token from the approved OIDC client integration and attach it only to trusted API origins. Do not blindly forward credentials to arbitrary URLs.

Normalize backend errors into user-safe messages. Do not expose stack traces, SQL details, internal hostnames, or sensitive request data to the browser.
