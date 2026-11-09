# Security and audit considerations

- Authenticate analysts through the enterprise identity provider.
- Enforce role- and case-based authorization in backend services.
- Mask customer/account identifiers and minimize data returned to the SPA.
- Protect APIs with TLS; apply CSRF protections when cookie-based sessions are used.
- Validate note length/content and status transitions server-side.
- Record actor, timestamp, action, before/after state, reason, correlation ID, and source.
- Keep audit records tamper-evident and access-controlled.
- Do not trust browser-supplied risk scores, analyst identity, or permissions.
- Apply retention, privacy, and regulatory policies to case data.
