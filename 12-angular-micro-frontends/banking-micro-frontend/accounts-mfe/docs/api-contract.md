# Proposed Accounts API contract

The endpoints below are illustrative and are not implemented by this front-end project.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/accounts` | Search and page accounts |
| GET | `/api/v1/accounts/{accountId}` | Account summary |
| GET | `/api/v1/accounts/{accountId}/transactions` | Recent account activity |
| GET | `/api/v1/customers/{customerId}/accounts` | Customer account relationships |

Example response fields:

```json
{
  "accountId": "AC-1001",
  "maskedAccountNumber": "**** 4821",
  "accountType": "SAVINGS",
  "currency": "INR",
  "ledgerBalance": 485000.00,
  "availableBalance": 472500.00,
  "status": "ACTIVE"
}
```

Production APIs must enforce customer/account entitlements, mask sensitive identifiers, validate pagination, and avoid exposing internal account data to unauthorized users.
