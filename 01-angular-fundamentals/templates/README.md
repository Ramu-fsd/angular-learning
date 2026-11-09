# Angular Templates

## Business scenario

Display recent payment transactions with clear status labels. The template should handle loading, empty, and populated states without deeply nested conditional markup.

## Concepts

- Interpolation: `{{ expression }}`
- Property binding: `[disabled]="isSubmitting()"`
- Event binding: `(click)="refresh()"`
- Attribute/class/style binding where appropriate.
- Modern control flow: `@if`, `@else`, `@for`, `@empty`, and `@switch`.
- Track repeated records by stable identity using `track transaction.id`.
- Keep complex calculations out of templates; expose simple view-model values.

## Example

See `transaction-list.component.ts`.

## Practice

1. Add a filter for PENDING and COMPLETED payments.
2. Add a `@switch` block for transaction statuses.
3. Add a loading skeleton state.
4. Ensure an empty result has a useful message and recovery action.
