# Architecture

```text
Angular Operations SPA
        |
        v
CDN / WAF / Identity
        |
        v
API Gateway
  |          |           |            |
  v          v           v            v
Shipment   Dispatch    Fleet       Tracking
Service    Service     Service     Ingestion
  |          |           |            |
  v          v           v            v
Shipment   Assignment  Vehicle DB   Event Store
DB         DB
        |
        +----> Route / ETA Engine
        +----> Carrier Integrations
        +----> Notifications
        +----> Audit Platform
```

The Angular demo consolidates state in `LogisticsDataService`. A production system should separate shipment lifecycle, dispatch, fleet master data, telematics ingestion and exception management behind service-owned APIs.
