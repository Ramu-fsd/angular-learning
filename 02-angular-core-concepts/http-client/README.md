# Angular HttpClient

## Business scenario
The Angular application calls payment and account APIs exposed by Spring Boot services. The client needs typed requests, query parameters, consistent error handling, and safe cross-cutting behavior.

## Concepts
- Configure `provideHttpClient()` at application bootstrap.
- Use typed `get<T>()`, `post<T>()`, `HttpParams`, and `HttpHeaders`.
- Use functional interceptors with `withInterceptors`.
- Do not log access tokens, personal data, or full payment payloads.
- Do not blindly retry non-idempotent requests such as payment creation.
- Prefer backend correlation IDs for support and observability.
- `HttpClient` Observables execute when subscribed.

## Example files
- `payment-api.service.ts`: typed API methods and query parameters.
- `api-error.interceptor.ts`: maps transport failures to a safe application error.
- `http.config.ts`: configures the interceptor.

## Practice
1. Add pagination parameters to transaction history.
2. Add a request correlation ID header.
3. Add a timeout policy for a read-only endpoint.
4. Design a safe retry strategy for GET calls and explain why POST payment retries require idempotency.
