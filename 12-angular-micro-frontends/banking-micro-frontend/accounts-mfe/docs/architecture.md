# Accounts remote architecture

## Responsibilities

The Accounts remote owns account portfolio presentation, account search/filtering, account detail views, and recent account activity. It does not own the global banking shell or cross-domain navigation.

## Component structure

- `AppComponent`: standalone remote application frame.
- `AccountsDashboardComponent`: portfolio metrics, search, filters, and account cards.
- `AccountDetailComponent`: account summary and recent activity.
- `AccountsService`: synthetic in-memory account collection and selectors.
- `account.models.ts`: typed account and transaction domain contracts.

## State

The service stores account data in an Angular Signal. Computed Signals derive portfolio metrics and filtered results. A production version should use HttpClient repositories and explicit loading, error, and empty states.

## Target federation topology

```text
Banking Shell (dynamic host)
  |
  +-- Accounts Remote (this project)
        |-- Portfolio
        |-- Account details
        |-- Recent activity
```
