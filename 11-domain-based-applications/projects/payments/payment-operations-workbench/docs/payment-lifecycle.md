# Payment Lifecycle and Controls

Illustrative state machine:

```text
DRAFT -> PENDING_APPROVAL -> APPROVED -> PROCESSING -> COMPLETED
                     |          |
                     v          v
                  REJECTED   FAILED / RETURNED
```

## Maker-checker
- Maker creates or submits the instruction.
- Checker reviews beneficiary, amount, currency, purpose, and screening context.
- A different authorized user approves or rejects.
- Backend validates separation of duties at decision time.
- Every transition records actor, time, reason, correlation ID, and previous/new state.

## Safe retry
Do not blindly retry payment creation or approval after a timeout. Query the authoritative payment state using the idempotency key or operation reference. A client retry must not create duplicate financial instructions.
