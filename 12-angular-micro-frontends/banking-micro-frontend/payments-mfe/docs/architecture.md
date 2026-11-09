# Payments remote architecture

## Responsibilities

The Payments remote owns payment initiation, queue visibility, payment detail, simulated approval/rejection, and payment activity. It does not own global platform navigation or authentication.

## Components

- `AppComponent`: standalone remote frame.
- `PaymentsDashboardComponent`: KPI summary, filters, and payment queue.
- `PaymentDetailComponent`: instruction detail, activity, notes, and lifecycle controls.
- `CreatePaymentComponent`: reactive payment-intake form.
- `PaymentsService`: in-memory payment state and workflow methods.
- `payment.models.ts`: typed payment and activity contracts.

## Target topology

```text
Banking Shell (dynamic host)
  |
  +-- Payments Remote
        |-- Payment queue
        |-- Payment initiation
        |-- Payment detail
        |-- Approval workflow
```

The current project runs standalone. Federation host integration is performed after the remote is configured and verified.
