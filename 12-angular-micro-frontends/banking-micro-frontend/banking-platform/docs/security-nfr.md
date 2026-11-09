# Security and NFR checklist

## Security
- Authenticate users at the platform boundary using the approved identity provider.
- Enforce authorization in every backend service; never rely on hidden frontend routes.
- Validate remote origins and use approved deployment domains.
- Avoid passing tokens through query strings or browser-visible configuration.
- Apply CSP, secure cookies, TLS and appropriate CORS policies.
- Version and scan shared dependencies and remote artifacts.
- Record privileged business actions in backend audit services.

## Non-functional requirements
- Availability: define host and remote availability objectives independently.
- Resilience: provide loading, timeout and remote-unavailable fallbacks.
- Performance: lazy-load remotes and avoid loading unused domain bundles.
- Scalability: scale frontend hosting and backend services independently.
- Compatibility: establish Angular and shared dependency version policies.
- Observability: correlate host navigation and backend requests with trace identifiers.
- Accessibility: preserve keyboard navigation and semantic page structure across remotes.
