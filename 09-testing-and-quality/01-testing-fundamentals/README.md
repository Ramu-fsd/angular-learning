# Testing fundamentals

A good test verifies behavior, not implementation details.

For a payment approval workflow:
- Arrange: create a pending payment.
- Act: invoke the approval command.
- Assert: the state becomes approved and the audit-relevant command is issued.
- Also test invalid IDs, duplicate approval, and failure paths.

Prefer deterministic tests:
- Do not depend on real networks or real customer data.
- Control clocks and randomness.
- Reset shared state between tests.
- Keep assertions focused and meaningful.
- Test boundary conditions and failure scenarios.
