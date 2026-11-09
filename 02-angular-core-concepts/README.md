# 02 – Angular Core Concepts

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This module develops the core Angular skills used to build business applications. Examples use synthetic banking, payment, customer onboarding, and operations data.

## Learning objectives

- Build structural and attribute directives, including reusable permission behavior.
- Create and use pipes for transaction and operational views.
- Design injectable services around business capabilities.
- Build reactive forms with synchronous and cross-field validation.
- Configure routes, route parameters, lazy loading, and navigation guards.
- Use `HttpClient` with typed requests, interceptors, and resilient error handling.

## Contents

| Folder | Topics | Domain exercise |
|---|---|---|
| `directives` | Built-in control flow, attribute directives, host bindings | Show/hide privileged payment actions |
| `pipes` | Pure/impure pipes, formatting, custom pipes | Transaction reference and status formatting |
| `services` | Injectable services, service boundaries, RxJS | Beneficiary and payment draft operations |
| `forms` | Reactive forms, validators, FormArray, cross-field validation | KYC customer onboarding |
| `routing` | Routes, parameters, guards, resolvers concepts | Banking operations navigation |
| `lazy-loading` | `loadComponent`, `loadChildren`, feature boundaries | Load payments feature on demand |
| `http-client` | Typed HTTP, params, interceptors, errors | Payment API client |

## Compatibility

Examples use modern standalone Angular APIs and typed reactive forms. Use a currently supported Angular release and matching Node.js/TypeScript versions. Some APIs and test-runner defaults differ by Angular release; consult the compatibility matrix for the version installed in your workspace.

## How to use

These are learning modules and feature examples, not a standalone Angular CLI workspace. Add them to a compatible workspace, wire the routes/providers shown in each README, and adapt import paths to your workspace layout.

## Engineering principles

- Keep business rules and API access out of templates.
- Treat the browser as an untrusted client. Enforce authorization, validation, limits, and payment controls on the server.
- Never place secrets or real customer/payment data in frontend source.
- Use synthetic identifiers and masked account references in examples.
- Avoid floating-point arithmetic for money; use integer minor units or a decimal strategy agreed with the backend.
- Prefer reactive forms for complex enterprise forms.
- Use route guards for navigation UX, never as the only security boundary.
- Use interceptors for cross-cutting HTTP concerns, not for feature-specific business logic.

## Interview checkpoints

1. Structural directive vs. attribute directive.
2. Pure vs. impure pipe and performance implications.
3. Component vs. service responsibilities.
4. Reactive forms vs. template-driven forms.
5. Why a route guard cannot secure a backend API.
6. `loadComponent` vs. `loadChildren`.
7. How `HttpInterceptorFn` works and how to avoid leaking credentials.
8. How to handle retries safely for non-idempotent payment requests.

## Completion checklist

- [ ] Create a reusable permission directive.
- [ ] Build custom pipes for transaction display.
- [ ] Implement typed domain services.
- [ ] Build and validate a KYC reactive form.
- [ ] Configure guarded banking routes.
- [ ] Lazy-load the payments feature.
- [ ] Build a typed HTTP client and error interceptor.
