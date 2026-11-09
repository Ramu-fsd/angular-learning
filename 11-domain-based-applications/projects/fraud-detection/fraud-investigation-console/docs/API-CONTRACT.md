# Suggested REST API contract

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/fraud/alerts` | Search/filter alert queue |
| GET | `/api/fraud/alerts/{alertId}` | Retrieve alert details |
| POST | `/api/fraud/alerts/{alertId}/assign` | Assign to analyst |
| POST | `/api/fraud/alerts/{alertId}/notes` | Add investigation note |
| PATCH | `/api/fraud/alerts/{alertId}/status` | Update case status |
| GET | `/api/fraud/alerts/{alertId}/audit` | Retrieve action history |

Use pagination, stable sorting, correlation IDs, idempotency where applicable, optimistic concurrency/version fields, and consistent problem-details error responses. Enforce authorization and valid state transitions on the server.
