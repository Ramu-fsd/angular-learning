# Payment Operations Workbench — Architecture

```mermaid
flowchart TB
  O[Operations Analyst / Approver] --> CDN[CDN + WAF]
  CDN --> SPA[Angular Workbench]
  SPA --> IDP[OIDC Identity Provider]
  SPA --> GW[API Gateway / BFF]
  GW --> P[Payment Orchestration API]
  GW --> S[Screening & Risk API]
  GW --> A[Audit API]
  P --> DB[(Payment Store)]
  P --> LEDGER[Ledger / Core Banking]
  P --> EVT[Kafka / Domain Events]
  S --> RULES[Sanctions / Fraud Services]
```

## Frontend modules
- Dashboard: operational metrics and queue summary.
- Payments: search, filter, detail, review, and decisions.
- Create payment: validated payment instruction form.
- Shared shell: navigation and demo operator selector.
- Data access: typed API boundary, replaceable demo adapter.

## Backend owns
Payment state machine, user entitlements, segregation of duties, payment limits, beneficiary validation, screening, idempotency, ledger posting, audit persistence, and event publication.

## NFRs
- Security: OIDC, least privilege, server-side authorization, CSP.
- Reliability: idempotent commands, bounded retries, explicit state.
- Performance: server-side paging, indexed search, bounded payloads.
- Auditability: actor, timestamp, action, reason, correlation ID.
- Availability: graceful degradation and clear stale-data indicators.
