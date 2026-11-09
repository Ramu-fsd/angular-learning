# Functional Route Guards

## Business scenario
Only authenticated staff should navigate to payment operations screens. The guard redirects unauthenticated users to a sign-in route and preserves the requested URL for the identity flow.

## Concepts
- `CanActivateFn` controls activation.
- `CanMatchFn` can control whether a route configuration matches.
- Return `true`, `false`, or a `UrlTree`/`RedirectCommand`.
- Prefer returning a `UrlTree` rather than imperatively navigating and returning false.
- Guards are evaluated in the browser and can be bypassed; APIs must independently authorize every operation.

## Example
`payment-operations.guard.ts` uses a demo session service. It is not a production authentication implementation.

## Practice
1. Add a permission check for `PAYMENT_REVIEW`.
2. Add a `CanMatchFn` to a lazy feature.
3. Write a backend authorization test proving a direct API call is rejected without permission.
