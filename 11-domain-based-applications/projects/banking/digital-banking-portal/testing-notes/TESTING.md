# Testing Notes

## Recommended test layers

- Unit: formatting helpers, validators, derived state.
- Component: forms, disabled states, empty/error/loading states.
- HTTP: API clients with Angular HTTP testing utilities.
- E2E: sign-in handoff, account navigation, transaction search, beneficiary validation, service request submission.

## Example scenarios

1. Transaction search filters descriptions and categories.
2. Invalid beneficiary account number blocks submission.
3. Valid beneficiary form emits a request through the data service.
4. API 403 displays an access message without leaking data.
5. API timeout offers a safe retry for read-only operations.
6. Payment-like commands are not blindly retried.

Run unit tests using the test runner configured by your generated Angular workspace:

```bash
ng test
```

Add Playwright or Cypress to the workspace for end-to-end coverage.
