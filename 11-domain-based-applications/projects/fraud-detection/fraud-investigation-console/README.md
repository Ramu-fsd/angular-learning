# Fraud Detection & Investigation Console

**Author:** Ramu Boya  
**Portfolio area:** Angular · Fintech · Fraud Operations

A standalone Angular learning project for monitoring transaction-risk alerts and managing analyst investigations.

## Capabilities
- Fraud operations dashboard with alert counts and risk exposure
- Search and filter by severity, status, and customer/transaction reference
- Alert detail and investigation workspace
- Assign an alert to the current analyst
- Add investigation notes and update case disposition
- Signals-based local state with typed domain models
- Typed HTTP API boundary ready for Spring Boot integration

## Create the Angular workspace
Use your locally installed Angular CLI so the project follows your installed Angular version:

```bash
ng new fraud-investigation-console --standalone --routing --style=css
```

Choose standard Zone.js if prompted. Replace the generated `src` folder with this package's `src` folder. Copy the documentation folder into the project root.

```bash
npm install
ng serve --open
ng build
```

If port 4200 is already occupied:

```bash
ng serve --open --port 4201
```

## Demo limitations
The risk scores and alerts are synthetic. State is held in memory and resets on refresh. Assignment, notes, and disposition are UI simulations. A production implementation must obtain decisions from backend fraud services and persist all analyst actions with authorization and immutable audit records.
