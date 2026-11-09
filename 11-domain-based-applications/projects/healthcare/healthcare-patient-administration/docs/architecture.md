# Architecture

The standalone Angular SPA contains:
- Route-level page components for dashboard, patient directory, patient detail, appointments and billing.
- `HealthcareDataService` as the demo state boundary, using Signals.
- Typed domain contracts in `models.ts`.
- Reactive UI bindings and template-driven form controls for the appointment workflow.

Suggested production flow:

```text
Patient / Staff Browser
        |
        v
CDN + WAF + Identity Provider
        |
        v
API Gateway
   |         |           |
   v         v           v
Patient   Scheduling   Revenue Cycle
Service   Service      Service
   |         |           |
Patient   Appointment   Billing DB
DB        DB            |
   |                     v
   +------> Audit / Integration Platform
```

A production implementation should integrate with authorized clinical systems and interoperability services through controlled APIs. Keep the browser free of authoritative clinical and billing rules.
