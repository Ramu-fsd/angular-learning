# Data Binding

## Business scenario

A customer prepares a domestic payment by selecting a beneficiary and entering an amount. The UI reflects the draft, reacts to user input, and prevents accidental submission while required fields are missing.

## Four common binding styles

| Binding | Syntax | Purpose |
|---|---|---|
| Interpolation | `{{ value }}` | Render text |
| Property | `[disabled]="condition"` | Set a DOM/component property |
| Event | `(click)="submit()"` | Respond to an event |
| Two-way | `[(ngModel)]="value"` | Keep a form control and component value synchronized |

For enterprise forms, prefer Angular Reactive Forms for complex validation, dynamic controls, and predictable form state. The example here isolates the binding concepts using a small template-driven draft.

## Example

See `payment-draft.component.ts`. It requires `FormsModule`.

## Security reminder

Never treat a disabled button or client-side validation as authorization. The backend must validate the customer, source account, beneficiary, limits, available funds, idempotency, and payment state.
