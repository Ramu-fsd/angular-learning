# Components

## Business scenario

Build a reusable account summary card and compose it inside a customer accounts page. The page owns the account collection; the card displays one account and emits an event when the user requests details.

## Concepts

- A component combines a TypeScript class, template, styles, and metadata.
- Keep one clear responsibility per component.
- Pass data down using inputs and communicate user intent upward using outputs.
- Prefer typed input/output contracts.
- Avoid putting HTTP calls and complex business rules directly in presentational components.

## Example files

- `account-summary.component.ts` – standalone presentational component.
- `customer-accounts.component.ts` – parent composition example.

## Practice

1. Add a `status` badge for ACTIVE/FROZEN/CLOSED.
2. Add an output for a "View transactions" action.
3. Make the card accessible by using a real button and meaningful labels.
4. Add a loading and empty state at the page level.
