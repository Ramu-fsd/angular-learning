# Enterprise Banking Portal - Angular Architecture Demo

A standalone Angular application demonstrating a modular enterprise shell with lazy-loaded Customer and Payments features.

## Setup

```bash
ng new enterprise-banking-portal --standalone --routing --style=css
cd enterprise-banking-portal
```

Replace the generated `src` directory with this project's `src` directory.

```bash
npm install
ng serve --open
```

Build:

```bash
ng build
```

## Validate

1. Load the overview route.
2. Navigate to Customers and Payments.
3. Confirm route navigation works and each feature is isolated.
4. Confirm the common shell/navigation remains consistent.
5. Test at desktop and mobile widths.
6. Run production build and inspect generated lazy chunks.

## Learning notes

The app uses local sample data and is intentionally frontend-only. Add API services and authentication through the patterns in category 07 before connecting real systems.
