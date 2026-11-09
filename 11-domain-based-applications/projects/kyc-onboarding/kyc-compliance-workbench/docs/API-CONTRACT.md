# Suggested REST API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/kyc/applications` | Search queue |
| GET | `/api/kyc/applications/{id}` | Retrieve application |
| PATCH | `/api/kyc/applications/{id}/documents/{docId}` | Review evidence |
| POST | `/api/kyc/applications/{id}/notes` | Add analyst note |
| POST | `/api/kyc/applications/{id}/screenings` | Request screening |
| POST | `/api/kyc/applications/{id}/decision` | Submit decision |
Use pagination, correlation IDs, idempotency, optimistic concurrency and consistent error contracts. Enforce authorization server-side.
