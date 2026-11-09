# Custom Directives

## Business scenario
A payment operations interface uses a consistent busy-state behavior across action buttons. A directive can disable an element while an operation is in progress and expose an accessible label.

## Concepts
- Use directives for reusable behavior attached to host elements.
- Use `input()` for reactive directive inputs.
- Use `host` metadata for host bindings/listeners where appropriate.
- Prefer Renderer2 or host bindings over unsafe direct DOM manipulation.
- A UI directive is not an authorization mechanism.

## Example
`busy-button.directive.ts` disables a button and sets `aria-busy`.

## Practice
1. Add a directive to mark stale data.
2. Add tests for busy state transitions.
3. Explain when a component is a better abstraction than a directive.
