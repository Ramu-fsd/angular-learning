# Enterprise Payment Operations Workbench

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

A more complete Angular portfolio application for a bank's payment operations team. It demonstrates a feature-oriented frontend, typed domain models, Signals-based state, reactive forms, queue filtering, payment detail review, maker-checker workflow concepts, and an audit timeline.

## Features
- Operations dashboard with queue metrics
- Payment queue with search, status, currency, and amount context
- Payment detail review
- Local maker-checker simulation: submitter cannot approve their own payment
- Approve / reject actions with mandatory reason for rejection
- Create payment instruction form with validation
- Audit event timeline
- API service boundary and OpenAPI-style contract
- Responsive layout and accessible labels

## Setup

```bash
ng new payment-operations-workbench --standalone --routing --style=css
cd payment-operations-workbench
```

Replace the generated `src` folder with this package's `src` folder. Copy `docs/`, `api-contracts/`, and `testing-notes/` to the workspace root.

```bash
npm install
ng serve --open
```

Production build:

```bash
ng build
```

## Demo users and workflow
The demo uses synthetic operators `ops.alex` and `ops.jordan`. A payment submitted by one operator cannot be approved by the same operator in the local simulation. Switch the demo operator in the top-right selector to explore the second-person approval flow.

This is a UI demonstration only. It does not provide secure identity, server-side segregation of duties, actual payment execution, sanctions screening, or ledger posting.

## Architecture
See `docs/architecture.md`, `docs/payment-lifecycle.md`, and `api-contracts/payment-api.md`.

## Validation checklist
- Dashboard route loads and queue metrics reflect state.
- Search and status filters narrow the queue.
- Detail route shows payment instruction and audit history.
- Submitter cannot approve their own payment in the demo.
- Rejection requires a reason.
- New payment form validates required fields and positive amount.
- `ng build` completes.
- Keyboard navigation and mobile layout are reviewed.

## Production controls
A real payment platform must enforce maker-checker and entitlements on the backend, use idempotency keys, persist immutable audit events, validate account ownership, screen payments, manage limits and cut-offs, and integrate with ledger/payment rails. Never rely on frontend checks as security controls.
