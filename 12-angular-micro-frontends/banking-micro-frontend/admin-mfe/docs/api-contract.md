# Proposed API contract

The current app uses local synthetic data. Suggested future endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/users` | Search and list platform users |
| PATCH | `/api/admin/users/{userId}/status` | Change user status |
| GET | `/api/admin/access-requests` | List access requests |
| POST | `/api/admin/access-requests/{requestId}/decision` | Approve or reject a request |
| GET | `/api/admin/roles` | Retrieve roles and permissions |
| GET | `/api/admin/audit-events` | Query audit events |
| GET | `/api/admin/features` | Read feature configuration |

All privileged mutations must be authorized and audited by the backend. Never trust client-side role checks as the security boundary.
