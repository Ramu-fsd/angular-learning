# Security and non-functional requirements

## Security

- Authenticate users through enterprise OIDC/OAuth2.
- Enforce maker/checker separation on the backend.
- Verify payment entitlements and transaction limits server-side.
- Apply beneficiary validation and relevant fraud/sanctions screening.
- Protect APIs with TLS, rate limits, secure headers, and audit logging.
- Never store secrets or real payment data in the front-end bundle.

## NFRs

- **Availability:** define service objectives for initiation and payment status visibility.
- **Performance:** define p95 targets for queue search and detail retrieval.
- **Reliability:** use idempotency for payment initiation and retry-safe commands.
- **Consistency:** define authoritative payment state and event ordering.
- **Scalability:** support bursty payment volumes and large operational queues.
- **Observability:** correlate shell, remote, API, and payment-event trace IDs.
- **Resilience:** remote-load failures must not crash the host shell.
- **Auditability:** retain immutable actor, action, timestamp, and correlation ID.
