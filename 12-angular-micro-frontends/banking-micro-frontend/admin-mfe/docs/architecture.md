# Architecture

## Component overview
- `AppComponent`: standalone feature shell and view composition.
- Angular Signals: local state for access requests, users, audit events, and feature flags.
- Computed signals: pending request count and filtered table rows.
- `app.config.ts`: application-wide router and zone configuration.
- `app.routes.ts`: route extension point for future feature-level routes.

## Federation boundary
This application is intended to be a separately deployed Native Federation remote called `admin`. The host owns top-level navigation and remote discovery. The remote owns its administration UI and feature-level state.

## Suggested production flow
Browser → Banking Shell → Admin Remote → API Gateway → IAM / Administration APIs → policy store and audit event service.
