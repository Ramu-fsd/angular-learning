# Payment API Contract Outline

Base path: `/api/v1`

## GET /payments?page=0&size=25&status=PENDING_APPROVAL&query=
Returns a page of payment instructions visible to the authenticated operator.

## GET /payments/{paymentId}
Returns payment details, masked account references, screening summary, and audit events.

## POST /payments
Creates a payment instruction. Require an `Idempotency-Key` header. Backend validates source account ownership, currency, limits, beneficiary, and permissions.

## POST /payments/{paymentId}/approve
Requires an authorized checker, decision version, and idempotency key. Backend enforces maker-checker.

## POST /payments/{paymentId}/reject
Requires a non-empty reason and authorized checker.

## Error envelope
```json
{
  "code": "SEGREGATION_OF_DUTIES_VIOLATION",
  "message": "The submitter cannot approve this instruction.",
  "correlationId": "server-reference"
}
```

The frontend must display server errors without attempting to override backend decisions.
