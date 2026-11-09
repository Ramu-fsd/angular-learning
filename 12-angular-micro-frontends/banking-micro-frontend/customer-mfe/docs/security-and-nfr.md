# Security and non-functional requirements

## Security

- Authenticate users through enterprise OIDC/OAuth2.
- Enforce customer-level authorization in backend APIs.
- Apply data minimization and mask sensitive personal information.
- Do not log full contact details or sensitive customer attributes.
- Enforce consent and purpose-of-use policies where applicable.
- Protect APIs with TLS, rate limits, secure headers, and audit events.
- Treat KYC and risk indicators as server-authoritative; the UI is not a compliance decision engine.

## NFRs

- Lazy-load the remote only when the customer domain is opened.
- Paginate customer directory results server-side.
- Define p95 targets for profile and interaction-history APIs.
- Provide controlled fallback when the remote fails to load.
- Correlate shell, remote, and API telemetry with trace identifiers.
- Ensure accessible keyboard navigation and screen-reader labels.
- Support independent deployment and rollback.
