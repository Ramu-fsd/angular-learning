# Banking State Management Dashboard

A standalone Angular learning application demonstrating Signals-based feature state in a banking operations dashboard.

## Create and run

From the parent folder:

```bash
ng new banking-state-management --standalone --routing --style=css
cd banking-state-management
```

Replace the generated `src` folder with this project's `src` folder. Keep the Angular CLI-generated workspace configuration, then run:

```bash
npm install
ng serve --open
```

Build:

```bash
ng build
```

## Validate

1. Check total balance and account count.
2. Select different accounts and confirm transaction rows change.
3. Search by transaction description or reference.
4. Filter by `All`, `Completed`, or `Pending`.
5. Select a pending transaction and click **Mark selected as reviewed**.
6. Confirm its status changes to `REVIEWED` and the pending count decreases.
7. Clear search and filters to inspect the full account activity.

## State design

- `BankingStateService` owns the accounts, transactions, selected account, search term, and status filter.
- `computed` signals derive balances, filtered transactions, and counts.
- Components invoke service methods and do not mutate signal values directly.
- This demo uses in-memory sample data. A production application should load server state from secured APIs and enforce all business permissions on the backend.
