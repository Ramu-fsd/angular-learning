# Security and privacy

- Use OIDC Authorization Code with PKCE for browser clients.
- Enforce authorization and resource ownership on backend APIs.
- Do not put secrets in frontend source, environment files, or bundles.
- Protect against XSS; avoid unsafe HTML bypasses.
- Set CSP and security headers at hosting/gateway.
- Use TLS and secure session/token handling.
- Minimize sensitive data rendered and cached in the browser.
- Mask account identifiers and avoid logging PII.
- Apply server-side rate limits, validation, audit, and fraud controls.
- Treat route guards as UX, not access control.

For payment actions, use server-side maker-checker rules, idempotency, and auditable state transitions.
