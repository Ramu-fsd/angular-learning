# Ecommerce Order & Fulfilment Workbench

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

An Angular portfolio application for an ecommerce operations team. It demonstrates catalogue browsing, cart management, order tracking, fulfilment queues, shipment updates and returns handling with synthetic data.

## Features
- Product catalogue with search and category filters
- Product details and add-to-cart interaction
- Cart quantity updates and order placement simulation
- Orders work queue with status filtering
- Order detail with fulfilment timeline
- Shipment tracking status updates
- Returns and refund request work queue
- Angular Signals, typed models, routing and HttpClient boundary

## Setup

Create the application from this folder's parent:

```bash
ng new ecommerce-order-fulfilment-workbench --standalone --routing --style=css
```

Replace the generated `src` folder with the supplied `src` folder. Copy this README and `docs` into the generated project root.

```bash
npm install
ng serve --open
```

Production build:

```bash
ng build
```

## Demo workflow
1. Browse products and add items to the cart.
2. Change quantities and place a sample order.
3. Open the orders queue and inspect the new order.
4. Update fulfilment and shipment stages.
5. Review the returns queue and its refund status.

## Production boundaries
The application uses synthetic in-memory records. Inventory reservation, pricing, tax, payment authorization, order acceptance, shipment carrier integration, refunds and returns eligibility must be validated by backend services. Never trust prices, quantities, discounts or status transitions supplied by the browser.
