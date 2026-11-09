# Reliability and resilience

Frontend reliability depends on API behavior, network conditions, browser runtime, and user recovery paths.

Patterns:
- Explicit loading, empty, success, and error states.
- Bounded retries only for safe/idempotent requests.
- Exponential backoff with jitter for transient failures.
- Request cancellation for stale searches.
- Avoid retrying non-idempotent payment commands blindly.
- Use idempotency keys for commands where supported by backend.
- Provide clear recovery actions.
- Graceful degradation when non-critical widgets fail.
- Track correlation IDs across browser, gateway, and backend logs.

Do not hide errors or display stale financial data as if it were current.
