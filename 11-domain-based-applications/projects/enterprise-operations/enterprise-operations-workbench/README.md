# Enterprise Operations Workbench

A standalone Angular application demonstrating an enterprise service-operations console for managing incidents, service requests, work assignment, SLA exposure, and operational audit history.

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

## Business scenario

An enterprise operations team needs a single workbench to monitor incoming incidents and service requests, prioritize SLA-sensitive work, assign ownership, and track resolution activity. The application uses synthetic in-memory data and simulates workflow actions in the browser.

## Features

- Operations dashboard with open-work, critical-priority, SLA-at-risk, and resolved metrics
- Search and filter the work queue by type, priority, status, and text
- Work-item detail view with description, requester, owner, timestamps, and activity history
- Assign work to an operations analyst
- Update priority and lifecycle status
- Add operational notes to the activity timeline
- Create a new incident or service request with reactive forms
- Angular standalone components, typed models, services, and Signals
- Responsive layout for desktop and tablet-sized screens

## Technology

- Angular standalone APIs
- TypeScript
- Angular Signals and computed state
- Reactive Forms
- Angular Router
- CSS

## Create the Angular project

From the parent folder:

```bash
ng new enterprise-operations-workbench --standalone --routing --style=css
```

Replace the generated `src` folder with the `src` folder from this package. Copy this `README.md` and the `docs` folder into the project root.

Then run:

```bash
npm install
ng serve --open
```

Build:

```bash
ng build
```

## Suggested portfolio path

`D:\MY-DEVELOPMENT\05-angular\angular-learning\11-domain-based-applications\projects\enterprise-operations\enterprise-operations-workbench`

## Demo credentials and data

No login is required. The application is a front-end portfolio demonstration. All records, assignments, status transitions, and notes are synthetic and held in memory; refreshing the browser resets changes.

## Production extensions

- Replace the in-memory service with typed HttpClient calls to Spring Boot APIs.
- Add OIDC/OAuth2 login and role-based authorization.
- Persist work items and audit events in PostgreSQL.
- Publish domain events to Kafka for downstream notifications and analytics.
- Add server-side SLA timers, optimistic locking, pagination, and observability.
