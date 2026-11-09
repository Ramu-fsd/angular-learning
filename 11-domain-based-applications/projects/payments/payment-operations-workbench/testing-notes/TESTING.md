# Testing Notes

Recommended test coverage:
- Payment state transition rules and derived queue metrics.
- Maker-checker rule for same-user approval.
- Rejection reason required.
- Payment creation form required fields and positive amount.
- Filter and search combinations.
- HTTP API success, 403, 409, 429, and 5xx responses.
- E2E maker submits, checker switches operator, checker approves.
- E2E same maker cannot approve their own payment.

Run the workspace test runner configured by your Angular CLI:

```bash
ng test
```

For browser E2E tests, add Playwright or Cypress and test authorization failures as well as successful workflows.
