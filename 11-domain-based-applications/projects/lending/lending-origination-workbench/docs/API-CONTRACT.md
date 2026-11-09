# Suggested REST API contract

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/loans/applications` | Search application pipeline |
| GET | `/api/loans/applications/{id}` | Retrieve application |
| PATCH | `/api/loans/applications/{id}/documents/{docId}` | Update document review |
| POST | `/api/loans/applications/{id}/assessment` | Request affordability/underwriting assessment |
| POST | `/api/loans/applications/{id}/notes` | Add underwriter note |
| POST | `/api/loans/applications/{id}/decision` | Submit decision |
| GET | `/api/loans/applications/{id}/audit` | Retrieve decision history |

Use pagination, correlation IDs, idempotency for commands, optimistic concurrency, consistent problem responses, and server-side authorization. Never accept a browser-calculated credit score or eligibility result as authoritative.
