# Lazy Loading

## Business scenario
A banking portal has separate payments and customer-service capabilities. Users should not download every feature bundle when they first open the home page.

## Concepts
- `loadComponent` lazy-loads a standalone component.
- `loadChildren` lazy-loads a route configuration or feature route tree.
- Lazy loading can improve initial bundle size and startup performance.
- It is not a security boundary; downloaded code is not secret.
- Feature routes should have clear ownership and avoid circular dependencies.

## Example
`app.routes.ts` loads the payments route tree only when a user navigates to `/payments`.

## Practice
1. Add a lazy-loaded customer-service feature.
2. Inspect the production build output and identify lazy chunks.
3. Compare eager and lazy route loading.
4. Explain preloading strategies and when they help.
