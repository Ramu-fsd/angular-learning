# Payment domain workflows

## Initiation and maker-checker

1. Maker enters debtor, beneficiary, amount, currency, channel, and purpose.
2. Form validation checks required fields and positive amount.
3. Submission creates a Pending Approval instruction.
4. A distinct checker reviews and approves or rejects the instruction.
5. Approved payments move to Processing.
6. The demonstration can mark a processing payment Completed or Failed.

The current UI simulates these transitions locally. A production implementation must enforce separation of duties and authorization on the server.

## Payment statuses

- Pending Approval: awaiting checker action.
- Processing: accepted for downstream execution.
- Completed: simulated successful completion.
- Rejected: rejected during approval.
- Failed: execution failed.

## Production concerns

Use idempotency keys, payment limits, sanctions/fraud screening, beneficiary validation, ledger posting controls, reconciliation, and immutable audit events. Never treat a browser-side status change as a real payment instruction.
