# Testing strategy

## Unit tests

- Payment selectors filter by text, status, and priority.
- KPI metrics count pending, completed, and failed/rejected records.
- Payment creation generates a new pending-approval instruction.
- Lifecycle updates append an activity event.
- Reactive form rejects missing values and non-positive amounts.

## Component tests

- Dashboard renders payment metrics and queue records.
- Filters update visible payments.
- Payment detail shows parties, amount, and activity.
- Pending approval exposes approve/reject actions.
- Processing exposes complete/fail actions.
- Create form submits and navigates to the new payment.

## End-to-end scenarios

1. Initiate a payment.
2. Verify it enters Pending Approval.
3. Approve it and verify Processing.
4. Mark it Completed.
5. Confirm the activity timeline and dashboard metrics update.

All test records must be synthetic. This application does not connect to real payment networks.
