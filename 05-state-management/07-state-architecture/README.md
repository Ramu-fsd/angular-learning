# State architecture for enterprise Angular applications

## State categories

- **Local UI state:** modal open, current tab, temporary form values.
- **Feature state:** selected account, payment queue, workflow state shared across feature components.
- **Server state:** remote account and transaction data, with loading/error/freshness semantics.
- **Cross-cutting state:** current user profile, feature flags, application-wide notifications.

## Decision guide

| Situation | Starting point |
|---|---|
| One component owns the value | Component field or signal |
| Several components in one feature share state | Injectable feature service with Signals/RxJS |
| Many teams/features need explicit event-driven state | NgRx Store |
| Complex asynchronous workflows | NgRx Effects or a clearly scoped service |
| Large normalized entity collections | NgRx Entity |
| Remote data with caching/invalidation needs | A server-state strategy; avoid duplicating it blindly in global state |

## Banking design example

A payments feature may have:
- `PaymentListComponent`: presentation and user interaction.
- `PaymentsFacade`: feature-facing API for components.
- `PaymentsStore` / NgRx feature state: selected payment and workflow status.
- `PaymentsEffects`: API calls and retry policy orchestration.
- `PaymentsApiService`: HTTP boundary.
- Backend: final authorization, validation, idempotency, and audit trail.

## Production considerations

- Define ownership: one authoritative source for each state value.
- Model loading, empty, success, and failure explicitly.
- Avoid storing derived totals when they can be computed.
- Prevent stale responses from overwriting newer user intent.
- Use optimistic updates only with rollback/reconciliation behavior.
- Keep secrets and sensitive financial data out of browser storage.
- Add tests for reducers, selectors, services, effects, and user-visible workflows.
