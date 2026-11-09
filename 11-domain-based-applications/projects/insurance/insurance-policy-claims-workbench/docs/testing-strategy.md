# Testing strategy

## Unit tests
- Policy and claim filtering.
- Claim reserve and exposure calculations.
- Status transition validation in the backend domain layer.
- Note creation and adjuster assignment.

## Component tests
- Empty states and loading/error states.
- Policy detail coverage rendering.
- Claim evidence checklist.
- Form validation and disabled submit behavior.

## Integration and end-to-end
- Policy-to-claim navigation.
- Claim search and status filtering.
- Assignment and note workflows.
- Unauthorized transition rejection.
- Duplicate command/idempotency behavior.

## Production test data
Use generated synthetic records only. Never commit real policyholder, claimant, medical or payment data.
