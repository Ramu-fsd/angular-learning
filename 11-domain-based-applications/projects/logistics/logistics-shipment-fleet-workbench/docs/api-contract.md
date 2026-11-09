# Suggested API contract

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/shipments?status=&priority=&query=` | Search shipment control tower |
| GET | `/api/shipments/{id}` | Read shipment and stop details |
| PATCH | `/api/shipments/{id}/assignment` | Assign eligible vehicle and driver |
| PATCH | `/api/shipments/{id}/status` | Request shipment transition |
| PATCH | `/api/shipments/{id}/stops/{stopId}` | Record stop milestone |
| GET | `/api/fleet/vehicles?status=&depot=` | Search fleet availability |
| GET | `/api/exceptions?severity=&status=` | Search operational exceptions |
| POST | `/api/shipments/{id}/proof-of-delivery` | Register delivery evidence |

Use event timestamps, idempotency keys, optimistic concurrency, pagination and correlation IDs. The server must validate vehicle capacity, driver eligibility, shipment ownership and legal status transitions.
