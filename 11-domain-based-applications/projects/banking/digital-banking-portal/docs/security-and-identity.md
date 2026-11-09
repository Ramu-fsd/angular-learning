# Security and Identity Integration Notes

This demo deliberately does not implement sign-in or token storage.

## Recommended browser authentication

- Use the organization's approved OpenID Connect provider.
- Prefer Authorization Code Flow with PKCE for browser-based applications.
- Follow the identity provider's supported Angular/browser integration guidance.
- Do not embed client secrets in Angular code.
- Do not treat route guards or hidden navigation as authorization.
- Enforce role, entitlement, account ownership, and transaction permissions on every backend request.
- Apply step-up authentication for sensitive actions according to bank policy.

## Browser and API protections

- Enforce TLS and suitable security headers at the edge.
- Configure a restrictive Content Security Policy.
- Prevent XSS; do not bypass Angular sanitization for untrusted content.
- Define CSRF protections based on the chosen session/token architecture.
- Avoid storing account numbers, identity documents, or access tokens in local storage.
- Mask sensitive identifiers and avoid logging PII.
- Use correlation IDs for support and incident investigation.

## Operational controls

Backend services must own fraud checks, beneficiary verification, transaction limits, audit events, rate limits, and maker-checker policies. Frontend validation improves usability but is never a substitute for server-side validation.
