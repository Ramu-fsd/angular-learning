# Dependency Injection

## Business scenario

A banking feature needs to retrieve account summaries from a backend API. The component should depend on an abstraction/service rather than constructing an HTTP client or embedding endpoint logic.

## Concepts

- Angular's injector resolves dependencies from provider scopes.
- `providedIn: 'root'` is suitable for many application-wide stateless services.
- Component-level providers create a scoped instance for that component subtree.
- `inject()` can retrieve dependencies in supported injection contexts.
- Use injection tokens for configuration or non-class dependencies.
- Avoid putting secrets in frontend configuration; browser-delivered values are public.

## Example

See `account-api.service.ts` and `account-overview.component.ts`.

The service uses `HttpClient`; configure it at application bootstrap with `provideHttpClient()`.

## Practice

1. Add a typed method to fetch transactions for an account.
2. Add a service-level error mapping strategy.
3. Explain when a component-scoped provider is useful.
4. Introduce an injection token for a public API base URL.
