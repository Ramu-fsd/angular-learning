# Testing strategy

## Unit tests
- Cart total and quantity calculations.
- Product search/category filtering.
- Order status and timeline derivation.
- Return status updates.

## Component tests
- Out-of-stock add-to-cart behavior.
- Empty cart and disabled checkout state.
- Quantity controls and order summary.
- Order detail timeline and status control.
- Return decision selector.

## Integration / E2E
- Add product, place order and open created order.
- Verify server-side price and stock validation.
- Exercise duplicate order submission with idempotency key.
- Shipment event updates order tracking.
- Return approval and refund reconciliation.
- Unauthorized order access is rejected.

Use synthetic customer and order data in tests.
