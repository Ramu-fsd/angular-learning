# Standalone Components

## Business scenario

A digital banking application has a customer accounts page made from independent feature components. Standalone components make dependencies explicit and support a feature-oriented application structure without requiring an NgModule for every feature.

## Concepts

- Set `standalone: true` explicitly in examples for clarity.
- Declare template dependencies in the component's `imports`.
- Bootstrap the root component with `bootstrapApplication`.
- Configure application-wide providers with `ApplicationConfig`.
- Lazy-load routes with `loadComponent` or `loadChildren`.
- Keep feature boundaries clear; standalone does not mean every component should be globally shared.

## Example files

- `app.config.ts` – application providers.
- `app.routes.ts` – feature route configuration.
- `main.ts` – standalone bootstrap.
- `banking-home.component.ts` – root page composition.

## Practice

1. Add a lazy-loaded `/payments` route.
2. Add a route-level provider for a feature-specific service.
3. Explain how standalone components reduce module ceremony.
4. Compare a standalone feature with a legacy NgModule-based feature.
