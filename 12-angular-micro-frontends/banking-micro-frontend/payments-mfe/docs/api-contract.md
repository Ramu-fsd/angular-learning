# Proposed Payments API contract

These endpoints are illustrative and are not implemented by this front-end demo.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/payments` | Search and page payment instructions |
| POST | `/api/v1/payments` | Initiate a payment |
| GET | `/api/v1/payments/{paymentId}` | Retrieve payment detail |
| POST | `/api/v1/payments/{paymentId}/approve` | Checker approval |
| POST | `/api/v1/payments/{paymentId}/reject` | Checker rejection |
| GET | `/api/v1/payments/{paymentId}/activity` | Retrieve audit activity |

Production APIs should validate maker/checker separation, payment limits, account entitlements, idempotency, and valid state transitions.
