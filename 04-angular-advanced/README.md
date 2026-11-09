# 04 – Angular Advanced

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This module focuses on advanced Angular engineering practices expected in enterprise applications. Examples use a synthetic payment operations console, with emphasis on performance, secure UI behavior, maintainable component boundaries, and safe API integration.

## Learning objectives

- Explain Angular change detection and use `OnPush` appropriately.
- Understand zoneless change detection and the compatibility implications of the Angular version in use.
- Profile and improve rendering performance rather than optimizing by guesswork.
- Build reusable attribute directives and render dynamic components safely.
- Implement functional HTTP interceptors for cross-cutting concerns.
- Design route guards for navigation experience without treating them as security boundaries.
- Understand authentication, authorization, XSS, CSRF, CSP, and safe session handling.
- Build, run, and validate a small standalone application using the concepts.

## Folder guide

| Folder | Topics | Business example |
|---|---|---|
| `change-detection` | Default/OnPush, signals, immutable updates | Payment queue refresh |
| `zoneless` | Zoneless change detection, scheduling, compatibility | High-throughput operations UI |
| `performance-optimization` | Track identity, lazy loading, profiling, bundle budgets | Large transaction table |
| `custom-directives` | Host bindings/listeners, reusable UI behavior | Permission-aware action button |
| `dynamic-components` | `ViewContainerRef`, `createComponent`, safe component composition | Payment detail panel |
| `interceptors` | Functional interceptors, correlation IDs, safe errors | Payment API requests |
| `route-guards` | Functional guards, `CanMatch`, return URL | Operations route access |
| `authentication-authorization` | OIDC concepts, roles/scopes, token/session patterns | Payment operations access |
| `security` | XSS, CSRF, CSP, DOM safety, secrets, threat modeling | Banking portal hardening |
| `projects/payment-operations-console` | Runnable learning app | Payment operations dashboard |

## Build/run/validate project

The package includes a runnable source project in `projects/payment-operations-console`. It uses a synthetic in-memory dataset so you can validate the UI without a backend. Follow `projects/payment-operations-console/README.md`.

### Prerequisites

- Node.js and npm versions supported by the Angular release you install.
- Angular CLI matching the selected Angular major version.
- A terminal in the project directory.

## Engineering standards

- Prefer standalone components and typed APIs.
- Use `OnPush` and Signals intentionally; understand how state changes notify Angular.
- Track repeated records by stable identifiers.
- Use lazy loading to establish feature boundaries and reduce initial bundle size.
- Do not manipulate the DOM with unsafe HTML APIs.
- Never store client secrets in Angular code or environment files delivered to browsers.
- Route guards are UX controls only; enforce authorization on backend APIs.
- Avoid putting bearer tokens in `localStorage` by default. Prefer a backend-for-frontend (BFF) with Secure, HttpOnly, SameSite cookies where architecture permits. If a browser OAuth client is required, follow current OAuth 2.0 Security Best Current Practice and use Authorization Code with PKCE through a vetted OIDC library.
- Do not automatically retry payment creation requests. Use backend-enforced idempotency and transaction-status reconciliation.
- Use synthetic data only.

## Interview checkpoints

1. How does `OnPush` change component checking behavior?
2. How do Signals notify Angular about state changes?
3. What changes when an Angular application is zoneless?
4. How do you profile a slow Angular screen?
5. Why is `track payment.id` important in a large list?
6. What belongs in an interceptor?
7. Why is a route guard not authorization?
8. Compare XSS and CSRF.
9. What does CSP mitigate, and what does it not solve?
10. Why should payment submission not be blindly retried?

## Completion checklist

- [ ] Explain change detection and OnPush.
- [ ] Understand zoneless mode and version compatibility.
- [ ] Profile and optimize a large list.
- [ ] Build a reusable directive and dynamic component.
- [ ] Configure functional interceptors.
- [ ] Implement a functional route guard.
- [ ] Explain secure authentication and authorization.
- [ ] Build, run, and validate the included payment operations app.
