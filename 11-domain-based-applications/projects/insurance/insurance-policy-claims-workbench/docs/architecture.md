# Architecture

## Frontend structure

- `app.routes.ts` defines dashboard, policy portfolio, policy detail, claims queue and claim detail routes.
- `InsuranceDataService` owns synthetic policy and claim state using Angular Signals.
- Page components consume the service and derive filtered views with `computed`.
- `models.ts` defines typed policy, claim, priority and workflow status contracts.

## Suggested production architecture

```text
Browser
  |
  v
Angular SPA (CDN / static hosting)
  |
  v
API Gateway / WAF / Identity Provider
  |
  +--> Policy Service ------> Policy DB
  |
  +--> Claims Service ------> Claims DB
  |          |
  |          +-------------> Document / Evidence Store
  |          +-------------> Workflow & Audit Service
  |
  +--> Billing / Payment Service
```

The browser should not decide coverage, eligibility, claim liability, reserve amounts or payment authorization. The backend must validate policy state and effective dates, apply product rules, authorize transitions and write immutable audit events.
