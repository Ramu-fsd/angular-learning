# 08 - Angular Enterprise Application Architecture

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This category focuses on structuring large Angular applications for multiple business domains and delivery teams. Examples use realistic banking, payments, KYC, and enterprise operations contexts.

## Modules

1. `01-feature-based-architecture` - organize by business capability, not technical file type.
2. `02-standalone-and-provider-architecture` - standalone bootstrap, route-level providers, and dependency scope.
3. `03-reusable-ui-and-domain-libraries` - distinguish design-system UI from domain logic.
4. `04-api-and-data-access-layers` - API clients, facades, DTO mapping, and server-state boundaries.
5. `05-micro-frontends` - when to use module federation and its operational trade-offs.
6. `06-monorepo-and-workspaces` - workspace boundaries, shared libraries, and build orchestration.
7. `07-enterprise-security` - identity integration, authorization boundaries, CSP, and secure configuration.
8. `08-observability-and-performance` - correlation IDs, telemetry, lazy loading, budgets, and runtime performance.
9. `09-architecture-decision-records` - document trade-offs and architecture decisions.
10. `projects/enterprise-banking-portal` - runnable modular Angular application demonstrating lazy-loaded feature areas.

## Run the runnable project

This package provides the complete `src` tree. Generate a workspace with your locally installed Angular CLI to avoid pinning the project to a specific CLI patch release:

```bash
ng new enterprise-banking-portal --standalone --routing --style=css
cd enterprise-banking-portal
```

Replace the generated `src` folder with `projects/enterprise-banking-portal/src` from this package. Keep the generated workspace files and configure the dev-server options with the supplied proxy file if you want to use the local API proxy.

```bash
npm install
ng serve --open
```

Production build:

```bash
ng build
```

## Validate

- The overview page loads.
- Navigate to Customers and Payments using the side navigation.
- Confirm feature routes load lazily.
- Confirm the shell remains visible when navigating between features.
- Resize to mobile width and confirm the navigation becomes usable.
- Confirm each feature has a meaningful empty/loading/error presentation.
- Run `ng build` and review bundle budget output.

## Architecture choices in the runnable app

- `core/` contains application-wide shell and cross-cutting services.
- `shared/` contains reusable presentation components.
- `features/` contains business capability areas.
- Each feature owns its routes and page components.
- The app shell lazy-loads feature route trees.
- Demo data is local and synthetic; backend integration is covered in category 07.

## Enterprise guidance

Do not introduce micro-frontends or a monorepo solely because the application is large. Start with clear feature boundaries and lazy-loaded routes. Add workspace libraries, independent deployment, or module federation only when organizational ownership and release constraints justify them.
