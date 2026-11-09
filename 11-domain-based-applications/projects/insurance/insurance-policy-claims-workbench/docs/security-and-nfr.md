# Security and non-functional requirements

- Authentication: enterprise OIDC/OAuth 2.0; short-lived access tokens.
- Authorization: role- and attribute-based access for claims handlers, adjusters, supervisors and payment approvers.
- Segregation of duties: prevent the same actor from creating and approving sensitive settlement actions where policy requires.
- Data protection: TLS in transit, encryption at rest, managed keys and secrets rotation.
- Privacy: minimize displayed personal data; mask sensitive identifiers; enforce retention and access logging.
- Evidence: malware scanning, content-type validation, size limits, immutable object storage and signed access URLs.
- Audit: record actor, timestamp, action, before/after state, correlation ID and decision rationale.
- Resilience: bounded retries, timeouts, circuit breakers, idempotent commands and dead-letter handling.
- Performance: server-side pagination/filtering, lazy-loaded routes and caching of non-sensitive reference data.
- Accessibility: keyboard navigation, semantic controls, visible focus and WCAG-aligned contrast.
