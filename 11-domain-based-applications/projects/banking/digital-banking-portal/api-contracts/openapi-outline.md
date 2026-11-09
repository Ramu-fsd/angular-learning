# Banking API Contract Outline

Base path: `/api/v1`

All endpoints require an authenticated customer context. The backend derives customer identity from the verified session/token; never trust a customer ID supplied by the browser as authorization.

## GET /accounts
Returns accounts available to the authenticated customer.

```json
{
  "items": [
    {
      "accountId": "acc-1001",
      "displayName": "Everyday Checking",
      "maskedNumber": "****4821",
      "accountType": "CHECKING",
      "currency": "USD",
      "availableBalance": 12840.55
    }
  ]
}
```

## GET /accounts/{accountId}/transactions?page=0&size=20&query=
Returns paginated transactions. Backend verifies account ownership.

## GET /beneficiaries
Returns entitled beneficiaries with masked account references and verification status.

## POST /beneficiaries
Request body contains beneficiary name, bank name, account number, and optional routing code. Backend applies validation, fraud checks, verification, and idempotency policy. Never treat a frontend validation result as approval.

## POST /service-requests
Request body contains request type and description. Response includes request reference and status.

## Error envelope

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Some fields need attention.",
  "correlationId": "server-generated-reference",
  "fieldErrors": {
    "accountNumber": "Invalid account number format."
  }
}
```

Use appropriate HTTP status codes: 400 validation, 401 unauthenticated, 403 forbidden, 404 unavailable resource, 409 conflict, 429 throttled, 5xx server failure.
