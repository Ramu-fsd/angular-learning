# Dynamic Components

## Business scenario
An operations analyst selects a payment and opens a detail panel appropriate to the payment state. Dynamic component creation can be useful for plugin-like or runtime-selected UI, but ordinary conditional templates are simpler when the component set is known at compile time.

## Concepts
- `ViewContainerRef.createComponent()` creates a component in a view container.
- Dynamic component instances should have clear input/output contracts.
- Destroy dynamically created components when replacing or removing them.
- Do not dynamically compile or execute untrusted HTML/JavaScript.
- Prefer `@if`/`@switch` for a small known set of alternatives.

## Example
`payment-detail-host.component.ts` dynamically creates a simple payment detail component.

## Practice
1. Add a second component for failed payments.
2. Replace the component when the selected payment changes.
3. Explain when `NgComponentOutlet` is simpler than `ViewContainerRef`.
