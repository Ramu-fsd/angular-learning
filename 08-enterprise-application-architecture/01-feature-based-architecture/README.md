# Feature-based architecture

Organize by business capability so a team can find the routes, pages, services, models, and tests for one domain together.

Example:

```text
src/app/
├── core/
│   ├── auth/
│   ├── http/
│   └── layout/
├── shared/
│   ├── components/
│   ├── pipes/
│   └── utils/
└── features/
    ├── customers/
    │   ├── pages/
    │   ├── data-access/
    │   ├── models/
    │   └── customers.routes.ts
    ├── payments/
    └── accounts/
```

Rules:
- `core`: singleton/cross-cutting application concerns.
- `shared`: reusable, business-agnostic UI and utilities.
- `features`: business capabilities and workflows.
- Avoid putting every service into a global `services/` folder.
- Keep domain-specific models with the domain that owns them.
