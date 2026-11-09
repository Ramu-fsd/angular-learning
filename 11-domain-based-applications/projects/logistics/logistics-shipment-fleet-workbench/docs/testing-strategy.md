# Testing strategy

## Unit tests
- Shipment filtering by status and priority.
- Active and delayed shipment calculations.
- Vehicle assignment capacity validation.
- Stop progression and delivery completion.

## Component tests
- Shipment queue search and empty state.
- Shipment detail and assignment controls.
- Fleet availability rendering.
- Exception queue links.

## Integration / E2E
- Assign a vehicle and driver to a booked shipment.
- Reject assignment when capacity is insufficient.
- Record stop milestones and complete delivery.
- Handle duplicate/out-of-order telematics events.
- Enforce dispatch permissions and audit events.

Use generated synthetic vehicle, driver and route records only.
