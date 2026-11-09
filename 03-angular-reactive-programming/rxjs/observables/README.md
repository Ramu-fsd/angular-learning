# Observables

## Business scenario
A payment tracking page polls or subscribes to payment status updates. The component should display the latest status and stop listening when it is destroyed.

## Concepts
- An Observable can emit zero or more `next` notifications, then optionally `error` or `complete`.
- A subscription can be unsubscribed, triggering teardown.
- `HttpClient` Observables are cold: each subscription normally makes a separate request.
- The `async` pipe manages subscription lifecycle in templates.
- Use `takeUntilDestroyed` for imperative subscriptions tied to an Angular injection context.

## Example
`payment-status.component.ts` uses `HttpClient` and `takeUntilDestroyed`. Replace the sample API endpoint with one exposed by your backend.

## Practice
1. Replace the sample interval with Server-Sent Events or WebSocket updates.
2. Add a reconnect policy with bounded backoff.
3. Explain why subscribing twice to a cold HTTP Observable can send two requests.
