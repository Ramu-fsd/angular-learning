# Suggested API contract

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/policies?query=&status=` | Search policy portfolio |
| GET | `/api/policies/{policyId}` | Read policy and coverage |
| GET | `/api/policies/{policyId}/claims` | List related claims |
| GET | `/api/claims?status=&priority=` | Search claims queue |
| GET | `/api/claims/{claimId}` | Read claim file |
| PATCH | `/api/claims/{claimId}/assignment` | Assign adjuster |
| PATCH | `/api/claims/{claimId}/status` | Request workflow transition |
| POST | `/api/claims/{claimId}/notes` | Add operational note |
| POST | `/api/claims/{claimId}/evidence` | Register evidence metadata |

Use DTO validation, pagination, optimistic concurrency (ETag/version), idempotency for payment-related operations and correlation IDs. The server must authorize every operation and persist audit events.
