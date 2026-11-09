# Directives

## Business scenario
A payment operations console displays actions according to the signed-in user's capabilities. The UI can hide an action the user cannot perform, while the backend independently enforces authorization.

## Concepts
- Attribute directives change the behavior or appearance of an element.
- Structural behavior is now commonly expressed with `@if` and `@for`; legacy `*ngIf`/`*ngFor` remain relevant in existing codebases.
- Use `@Directive`, `input`, `ElementRef`, `Renderer2`, and `DestroyRef` appropriately.
- Do not implement security solely through a directive.

## Example
`has-permission.directive.ts` shows an element only when the permission is present.

## Practice
1. Add `PAYMENT_APPROVE` and `PAYMENT_REVERSE` permissions.
2. Test behavior when the permission list changes.
3. Explain why a hidden button does not prevent a direct API call.
