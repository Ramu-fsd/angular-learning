# Architecture

```text
Browser / Angular SPA
       |
       v
CDN + WAF + Identity
       |
       v
API Gateway
  |       |          |           |
  v       v          v           v
Catalog  Cart/Order Inventory  Fulfilment
Service  Service    Service    Service
  |       |          |           |
  v       v          v           v
Catalog  Order DB   Stock DB   Shipment DB
          |
          +------> Payment Provider
          +------> Returns / Refund Service
          +------> Notification Service
```

The demo uses a single `StoreService` with Signals to keep the workflow approachable. In production, split bounded contexts into independently owned backend services and use events for order, inventory, shipment and refund lifecycle changes.
