# Suggested API contract

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/catalog/products?query=&category=` | Search catalogue |
| GET | `/api/catalog/products/{id}` | Product detail |
| POST | `/api/cart/validate` | Validate prices and stock |
| POST | `/api/orders` | Place order using idempotency key |
| GET | `/api/orders?status=&query=` | Search orders |
| GET | `/api/orders/{id}` | Read order and fulfilment |
| PATCH | `/api/orders/{id}/fulfilment` | Request authorized fulfilment transition |
| GET | `/api/returns?status=` | Search return requests |
| POST | `/api/returns` | Create return request |
| PATCH | `/api/returns/{id}/decision` | Approve/reject return |
| POST | `/api/returns/{id}/refund` | Initiate authorized refund |

Use server-side pagination, optimistic concurrency, idempotency keys, correlation IDs and stable error contracts. Prices and totals must be recalculated by the server.
