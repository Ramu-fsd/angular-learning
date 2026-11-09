# Proposed Customer API contract

These endpoints are illustrative and are not implemented by this front-end demo.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/customers` | Search and page customer profiles |
| GET | `/api/v1/customers/{customerId}` | Retrieve customer profile |
| GET | `/api/v1/customers/{customerId}/accounts` | Retrieve linked account references |
| GET | `/api/v1/customers/{customerId}/interactions` | Retrieve service interaction history |

Production APIs must enforce customer entitlements, consent and purpose restrictions, field-level access, and audit logging.
