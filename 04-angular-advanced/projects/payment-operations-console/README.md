# Payment Operations Console – Angular Advanced Capstone

A small standalone Angular application demonstrating advanced concepts in a synthetic payment operations workflow.

## Features

- OnPush change detection and Signals.
- Computed queue metrics.
- Stable identity tracking with `track payment.id`.
- Status filtering and client-side pagination.
- Functional route guard with a demo sign-in flow.
- Functional HTTP interceptor that adds a correlation ID.
- Safe error handling example.
- Synthetic payment records only; no backend required.

> This is a learning capstone, not a production banking application. The sign-in flow is deliberately a demo and must not be used for real authentication. The in-memory state is not a payment ledger.

## Prerequisites

Install a Node.js/npm version supported by the Angular major version you choose. Use a matching Angular CLI. Confirm compatibility at the official Angular documentation before creating the workspace.

## Build the app

From a terminal in `angular-learning/04-angular-advanced/projects`:

```bash
ng new payment-operations-console --standalone --routing --style=scss --skip-tests
```

If prompted for SSR or other optional features, choose the defaults appropriate for a simple client-side learning app. Enter the generated folder:

```bash
cd payment-operations-console
```

Replace the generated `src/` files with the contents of this package's `src/` folder. Keep the CLI-generated `package.json`, lockfile, `angular.json`, and TypeScript configuration.

The package includes:
- `src/main.ts`
- `src/index.html`
- `src/styles.scss`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `src/app/app.component.ts`
- `src/app/payment-operations/` feature files
- `src/app/security/` demo guard/session files
- `src/app/interceptors/` correlation interceptor

## Run

```bash
npm install
ng serve --open
```

Open the local URL printed by Angular CLI (normally `http://localhost:4200`).

## Validate manually

1. Open `/` and confirm the payment queue and summary metrics render.
2. Filter by `PENDING`, `PROCESSING`, `COMPLETED`, and `FAILED`.
3. Change page size and navigate between pages.
4. Click **Sign in (demo)**. Confirm the UI changes to signed-in state.
5. Navigate to `/operations`. Confirm the guard allows access after demo sign-in.
6. Click **Sign out** and navigate to `/operations`. Confirm the app redirects to `/sign-in`.
7. Click **Test correlation header**. Open browser DevTools → Network, select `/api/demo/health`, and confirm `X-Correlation-ID` is present. A 404/network error is expected if no backend is running.
8. Run a production build:

```bash
ng build
```

9. Confirm the build completes and inspect `dist/` output.

## Validate with tests

The generated CLI workspace may configure a test runner depending on the Angular version and options selected. Add tests using the generated test setup. At minimum, test:
- Queue filter returns only the selected status.
- Summary counts match the displayed synthetic records.
- Guard redirects when signed out and permits access when signed in.
- Interceptor adds a correlation ID header.

## Production engineering extensions

- Replace in-memory data with a Spring Boot payment operations API.
- Add server-side pagination/filtering.
- Integrate with an approved OIDC provider or BFF; remove demo sign-in.
- Enforce authorization, maker-checker rules, transaction limits, and idempotency on the backend.
- Add component tests, API integration tests, E2E tests, accessibility checks, and performance budgets.
- Add observability using backend correlation IDs and privacy-safe telemetry.
