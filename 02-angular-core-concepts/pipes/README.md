# Pipes

## Business scenario
Operations analysts scan payment queues and need consistent display labels for transaction status and masked references.

## Concepts
- Pipes transform values for presentation.
- Prefer pure pipes for deterministic transformations.
- Avoid expensive work and side effects in pipes.
- Use `DatePipe`, `CurrencyPipe`, and `DecimalPipe` for standard formatting.
- Keep financial calculation and rounding rules in a domain/service layer, not a display pipe.

## Examples
- `transaction-status.pipe.ts`: maps API status codes to readable labels.
- `masked-reference.pipe.ts`: masks an identifier for display; never use it as a substitute for data minimization or backend masking.

## Practice
1. Add labels for `REVERSED` and `UNDER_REVIEW`.
2. Add tests for unknown statuses.
3. Explain why a pipe should not call an API.
