# Suggested API contract

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/patients?query=&status=` | Search patient directory |
| GET | `/api/patients/{id}` | Read authorized patient profile |
| GET | `/api/patients/{id}/encounters` | Retrieve encounter references |
| GET | `/api/appointments?from=&to=&department=` | Search appointment schedule |
| POST | `/api/appointments` | Create appointment |
| PATCH | `/api/appointments/{id}/status` | Update appointment state |
| GET | `/api/billing/items?status=` | Search billing work queue |
| GET | `/api/billing/items/{id}` | Read billing item |

Apply server-side authorization, validation, pagination, idempotency for commands, correlation IDs and consistent error contracts. Avoid returning unnecessary patient attributes.
