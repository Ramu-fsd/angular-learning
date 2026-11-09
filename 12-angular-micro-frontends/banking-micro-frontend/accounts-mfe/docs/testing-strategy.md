# Testing strategy

## Unit tests

- Account selectors filter by customer, masked account number, type, and status.
- Portfolio metrics calculate count and aggregate ledger balance.
- Account detail lookup returns the matching account or undefined.
- Currency and date values render in the expected format.

## Component tests

- Dashboard displays summary metrics and account cards.
- Search and filter controls update the result set.
- Selecting a card navigates to the correct account detail.
- Account details show transaction history or the empty state.

## Federation integration tests

- Host loads the Accounts remote entry.
- Remote route works after browser refresh with SPA fallback configured.
- Remote failure does not crash the host shell.
- Remote origin is allowed by the configured CSP and CORS policies.

## Data safety

Use only synthetic records. Do not copy customer names, account numbers, or transaction details from a real banking environment.
