# Domain workflows

## Order lifecycle
1. Customer selects catalogue items.
2. Backend validates current price, availability, promotions, tax and delivery constraints.
3. Inventory is reserved with concurrency protection.
4. Payment authorization/capture follows the business payment policy.
5. Order is confirmed and routed to a fulfilment location.
6. Warehouse picks, packs and hands the parcel to a carrier.
7. Carrier events update delivery tracking.
8. Delivery confirmation closes the fulfilment workflow.

## Returns lifecycle
1. Customer requests a return.
2. Backend validates return window, item eligibility and order ownership.
3. Operations approves or rejects the request.
4. Item is received and inspected.
5. Refund is issued through the payment provider.
6. Inventory disposition and audit records are updated.

The frontend only simulates these states; it does not reserve inventory, process payment or issue refunds.
