# Services

## Business scenario
A payment feature needs to prepare a payment draft, retrieve beneficiaries, and submit a payment request. Components should orchestrate user interaction; injectable services should own API access and reusable application operations.

## Concepts
- `@Injectable({ providedIn: 'root' })` for app-wide services.
- Use typed request/response contracts.
- Return Observables from `HttpClient` methods so callers control subscription lifecycle.
- Avoid subscribing inside services unless the service owns a long-lived process.
- Use clear domain methods rather than generic `doEverything()` services.

## Examples
- `payment.models.ts`: API contracts.
- `payment.service.ts`: payment operations.
- `payment-review.component.ts`: feature component consuming the service.

## Practice
1. Add beneficiary retrieval.
2. Add a typed payment status response.
3. Add idempotency-key support to a payment submission contract; the backend must enforce it.
4. Explain why retries of payment submission need special care.
