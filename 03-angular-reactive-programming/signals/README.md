# Angular Signals

## Business scenario
A payments dashboard shows a filtered list of payment records and derives totals for the current view. Signals make local synchronous UI state explicit and efficient.

## Concepts
- `signal()` creates writable reactive state.
- `computed()` derives state and should remain side-effect free.
- `effect()` runs side effects in response to signal dependencies; use sparingly.
- `input()` and `output()` are signal-based component APIs.
- Signals track synchronous reads; they are not a replacement for every asynchronous stream.
- Use immutable updates for arrays and objects to keep state changes clear.

## Example
`payment-dashboard.component.ts` derives filtered payments and total visible amount from Signals.

## Practice
1. Add a status filter and a selected-payment signal.
2. Explain why the total is a computed signal, not a second writable signal.
3. Add a test for the computed total.
4. Explain why an effect is not the right place to calculate derived values.
