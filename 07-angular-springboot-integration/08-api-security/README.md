# API security checklist

For every Spring Boot endpoint:
- Authenticate the caller where required.
- Authorize the specific resource and action on the backend.
- Validate path, query, and body input.
- Apply request size and rate limits.
- Use parameterized persistence operations.
- Return safe error payloads.
- Add audit events for sensitive operations.
- Use TLS between browser, gateway, services, and data stores.
- Protect against IDOR by checking resource ownership/entitlements.
- Use idempotency keys for payment-like commands.
- Avoid logging secrets, tokens, full account numbers, or sensitive personal data.

Angular validation and route guards are usability features. They do not replace backend controls.
