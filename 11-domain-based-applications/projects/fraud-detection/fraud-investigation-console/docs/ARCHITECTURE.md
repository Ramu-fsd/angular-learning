# Architecture

```text
Angular SPA
  ├── Dashboard feature
  ├── Alert queue feature
  ├── Investigation feature
  ├── Core
  │    ├── typed domain models
  │    ├── Signals state service
  │    └── HttpClient API boundary
  └── shared presentation
          |
          v
API Gateway / BFF
  ├── Fraud Alert Service
  ├── Case Management Service
  ├── Customer & Account Service
  ├── Transaction Service
  └── Identity, policy and audit services
          |
          v
Event stream / risk engine / case store / audit store
```

The browser is a presentation and workflow client. It must not calculate authoritative fraud decisions or independently release/decline transactions. Backend services own risk decisions, authorization, persistence, and audit.
