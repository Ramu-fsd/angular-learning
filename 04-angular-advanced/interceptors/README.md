# Functional HTTP Interceptors

## Business scenario
All payment API requests need a correlation ID for support and observability. Errors should be converted to safe UI messages without exposing internal server details or sensitive payloads.

## Concepts
- Configure functional interceptors using `withInterceptors`.
- Use interceptors for cross-cutting behavior: correlation IDs, safe error normalization, and carefully designed authentication integration.
- Do not log access tokens, full payment bodies, identity documents, or personal data.
- Do not attach credentials to arbitrary origins.
- Avoid automatic retry of non-idempotent payment requests.
- Prefer a BFF/session architecture when it reduces token exposure in the browser.

## Examples
- `correlation-id.interceptor.ts`
- `safe-error.interceptor.ts`
- `http.config.ts`

## Practice
1. Add a backend-provided correlation ID to an error view.
2. Restrict any auth header injection to trusted API origins.
3. Explain why a correlation ID is not an authentication credential.
