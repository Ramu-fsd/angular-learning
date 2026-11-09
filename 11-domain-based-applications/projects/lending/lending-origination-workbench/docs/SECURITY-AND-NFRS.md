# Security and non-functional requirements

- Mask personal identifiers and account details in list views.
- Encrypt sensitive applicant data and documents in transit and at rest.
- Enforce role-based and application-level authorization.
- Separate maker and checker responsibilities for high-risk decisions.
- Record decision actor, timestamp, policy version, rationale, evidence references, and correlation ID.
- Protect bureau integrations with secrets management, mTLS where required, timeouts, retries, and circuit breakers.
- Apply retention and deletion policy to documents and financial records.
- Define availability, latency, throughput, recovery objectives, and audit retention with business owners.
- Keep credit policy and affordability calculations server-side and versioned.
