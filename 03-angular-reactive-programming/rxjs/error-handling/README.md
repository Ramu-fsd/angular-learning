# RxJS Error Handling

## Business scenario
A transaction history read can fail temporarily because of a network interruption or service outage. The UI should show a safe message and allow a later refresh. Payment creation requires a different retry policy because duplicate commands can have financial impact.

## Concepts
- `catchError` maps or recovers from an error.
- Place `catchError` inside a flattening operator when one failed request should not terminate the outer user-input stream.
- `retry` resubscribes; it does not know whether an operation is safe to repeat.
- `retryWhen` is available in older RxJS patterns; modern code can use `retry` with configuration.
- `timeout` bounds waiting time.
- `finalize` runs on completion, error, or unsubscribe.
- `throwError` re-emits an error.
- Use bounded retries with backoff for appropriate idempotent reads only.

## Example
`transaction-history.service.ts` demonstrates a bounded retry for a GET request and a safe error boundary.

## Practice
1. Add exponential backoff with jitter for a read-only endpoint.
2. Add a correlation ID to logs without logging customer data.
3. Explain why a timeout does not prove that a payment was not processed.
4. Design a status-check flow after an ambiguous payment submission result.
