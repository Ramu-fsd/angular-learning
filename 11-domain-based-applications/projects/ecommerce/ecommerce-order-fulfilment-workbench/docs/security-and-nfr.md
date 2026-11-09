# Security and non-functional requirements

- Identity: OIDC/OAuth 2.0 with customer and operations roles.
- Authorization: order ownership checks and least-privilege operational permissions.
- Payment security: use hosted/tokenized payment flows; never store card data in the SPA.
- Integrity: server-calculated price, discount, tax, stock and refund amount.
- Idempotency: protect order placement, payment capture and refund commands.
- Resilience: timeouts, bounded retries, circuit breakers and event-driven recovery.
- Inventory: prevent overselling using atomic reservation or versioned stock updates.
- Observability: correlation IDs across order, inventory, payment and shipment services.
- Performance: CDN caching for public catalogue content; do not cache customer-specific order data publicly.
- Accessibility: keyboard support, semantic controls, responsive layouts and visible focus.
- Audit: record actor, action, before/after state and decision rationale for sensitive operations.
