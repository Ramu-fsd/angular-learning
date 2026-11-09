# API and integration design

Design stable API contracts with backend teams.

Topics:
- REST resource modeling and command endpoints.
- API gateway versus Backend-for-Frontend (BFF).
- Versioning and backward compatibility.
- Pagination, sorting, filtering, and field selection.
- Correlation IDs and standardized error envelopes.
- Timeouts and request cancellation.
- Optimistic concurrency and ETags.
- Idempotency for payment commands.
- OpenAPI contracts and generated clients.

A BFF is useful when multiple client types need tailored aggregation. Avoid creating a BFF that simply proxies every request without a clear purpose.
