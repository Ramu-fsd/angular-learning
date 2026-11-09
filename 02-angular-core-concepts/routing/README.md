# Routing

## Business scenario
A banking operations portal has separate account, payment, and customer review areas. Routes provide navigation and feature boundaries, while the server enforces access control for every API.

## Concepts
- `Routes`, `RouterOutlet`, `RouterLink`.
- Route parameters and query parameters.
- `canActivate` / `canMatch` functional guards.
- Route data and resolvers.
- Wildcard routes and redirects.
- Keep guards fast and avoid duplicating backend authorization logic.

## Example
`app.routes.ts` defines a protected payment operations route using a functional guard.

## Practice
1. Add a `:paymentId` route parameter.
2. Add a query parameter for queue status.
3. Add a not-found page.
4. Explain why the backend must validate the user's permission even if the route is guarded.
