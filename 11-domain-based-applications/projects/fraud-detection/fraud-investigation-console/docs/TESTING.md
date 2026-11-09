# Testing checklist

## Component and service tests
- Dashboard metrics reflect the alert collection.
- Search matches alert ID, transaction ID, and customer reference.
- Severity and status filters compose correctly.
- Assignment updates the selected alert.
- Notes are associated with the correct alert.
- Invalid status transitions are rejected by the domain/API layer.

## End-to-end scenarios
1. Open the alert queue and filter to CRITICAL.
2. Open an alert and review transaction context.
3. Assign the alert to the current analyst.
4. Add an investigation note.
5. Escalate the alert and verify the status indicator.

The included UI is a learning demo. Add tests against the real API and authorization policies before production use.
