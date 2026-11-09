# Logistics Shipment & Fleet Operations Workbench

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

An Angular portfolio project for logistics operations teams to monitor shipments, coordinate fleet assignments, manage delivery stops and investigate operational exceptions. Uses synthetic shipment and vehicle data.

## Features
- Shipment control tower with status and priority filters
- Shipment details, route stops and delivery timeline
- Fleet directory with vehicle and driver availability
- Assign a vehicle/driver to a shipment (demo workflow)
- Update stop status and record proof-of-delivery indicator
- Exception queue for delayed, failed or at-risk shipments
- Signals-based state, typed models and route-level pages

## Setup

Create the application from this folder's parent:

```bash
ng new logistics-shipment-fleet-workbench --standalone --routing --style=css
```

Replace the generated `src` folder with the supplied `src` folder. Copy this README and `docs` into the project root.

```bash
npm install
ng serve --open
```

Production build:

```bash
ng build
```

## Suggested demo
1. Filter the shipment control tower by status or priority.
2. Open a shipment and inspect its planned route stops.
3. Assign an available vehicle and driver.
4. Update stop progression and mark delivery complete.
5. Review the operational exception queue.

## Production boundaries
All records and locations are synthetic. Real GPS, geocoding, route optimization, carrier integrations, driver identity, vehicle telematics, delivery evidence and customer notifications are not connected. Dispatch authorization, geofence checks, proof-of-delivery integrity and status transitions must be enforced by backend services.
