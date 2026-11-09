# Security and NFR checklist

- Identity: enterprise OIDC with MFA for workforce users.
- Authorization: role- and attribute-based controls; enforce purpose of use.
- Privacy: minimum necessary data, consent enforcement where applicable, masking and retention controls.
- Encryption: TLS in transit and encryption at rest with managed key rotation.
- Audit: log patient-record access, changes, exports and administrative actions.
- Session security: short-lived tokens, secure cookies where applicable, CSRF protection and inactivity timeout.
- Integrations: validate partner identity, message integrity, schema and replay protection.
- Availability: resilient dependencies, bounded retries, timeouts and operational alerting.
- Performance: paginated queries, lazy route loading and caching only for suitable non-sensitive reference data.
- Accessibility: semantic forms, keyboard support, visible focus and readable contrast.
- Compliance: map controls to applicable local healthcare privacy and data-protection requirements with legal/security review.
