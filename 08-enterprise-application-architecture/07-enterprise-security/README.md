# Enterprise frontend security

- Use a trusted OIDC provider and Authorization Code with PKCE.
- Enforce authorization in backend APIs, not only route guards.
- Do not embed secrets in Angular bundles or environment files.
- Configure Content Security Policy and security headers at the hosting/gateway layer.
- Sanitize untrusted HTML; avoid bypassing Angular sanitization.
- Validate uploads on the backend.
- Use secure session/token handling based on the identity architecture.
- Avoid logging access tokens, personal data, full account numbers, or payment details.
- Apply dependency scanning and keep Angular packages patched.
