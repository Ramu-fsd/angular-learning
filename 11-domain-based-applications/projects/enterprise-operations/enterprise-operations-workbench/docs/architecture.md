# Architecture

## Front-end structure

- `AppComponent`: application shell, primary navigation, and router outlet.
- `DashboardComponent`: operational KPIs and priority work snapshot.
- `WorkQueueComponent`: searchable and filterable work queue.
- `WorkDetailComponent`: work-item detail, assignment, lifecycle controls, and activity history.
- `CreateWorkComponent`: reactive form for incident and service-request intake.
- `OperationsService`: in-memory state, selectors, and workflow operations.
- `work.models.ts`: shared domain types.

## State flow

Components consume the singleton `OperationsService`. A writable Signal stores the work-item collection. Computed Signals derive dashboard metrics and queue results. User actions call service methods, which update the Signal and automatically refresh dependent views.

## Future backend integration

A Spring Boot service could expose `/api/v1/work-items`, `/api/v1/work-items/{id}`, `/assignments`, and `/activity`. Replace synchronous in-memory methods with HttpClient calls and represent loading/error states explicitly.
