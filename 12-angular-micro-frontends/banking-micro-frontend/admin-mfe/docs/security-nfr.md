# Security and non-functional requirements

## Security
- Enforce authorization on every backend endpoint; UI visibility is not authorization.
- Apply least privilege and separation of duties to privileged roles.
- Require step-up authentication for high-risk administrative actions.
- Store audit events in tamper-resistant server-side storage.
- Validate all inputs server-side and protect session state against CSRF and theft.
- Avoid exposing secrets, personal data, or internal identifiers in browser logs.

## Non-functional requirements
- Availability: align with the banking platform's administration service SLO.
- Performance: paginate and filter large user/audit datasets server-side.
- Scalability: keep remote UI stateless; scale APIs independently.
- Accessibility: keyboard-operable controls, visible focus, semantic labels.
- Observability: correlate UI actions with backend request and audit identifiers.
- Resilience: provide clear loading, timeout, and recoverable error states.
