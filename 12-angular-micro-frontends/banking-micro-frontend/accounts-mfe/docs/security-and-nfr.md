# Security and non-functional requirements

## Security

- Authenticate through the platform identity provider.
- Enforce account-level authorization in backend services.
- Mask account identifiers in UI and logs.
- Never store credentials, access tokens, or real customer data in source code.
- Apply TLS, CSP, CORS allowlists, and secure response headers.
- Validate all account access on the server; remote route guards are not sufficient.

## NFRs

- Lazy-load the remote when the user enters the Accounts domain.
- Define p95 targets for account search and account detail APIs.
- Paginate large account portfolios server-side.
- Provide a remote-load fallback and retry path.
- Correlate shell, remote, and API telemetry with trace identifiers.
- Ensure keyboard navigation and accessible status labels.
- Support independent remote deployment and rollback.
