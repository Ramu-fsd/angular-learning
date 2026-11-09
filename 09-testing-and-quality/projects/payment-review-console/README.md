# Payment Review Console - Testing Project

A standalone Angular demo for a payment operations queue, with a unit test example and a Playwright end-to-end test.

## Create workspace

```bash
ng new payment-review-console --standalone --routing --style=css
cd payment-review-console
```

Replace the generated `src` folder with this project's `src` folder. Copy `e2e/` and `playwright.config.ts` to the workspace root.

## Install and run

```bash
npm install
ng serve
```

Open `http://localhost:4200`.

## Unit tests

The supplied `payment-state.service.spec.ts` is a Jasmine-style spec. Run it with the test runner configured in your Angular CLI workspace:

```bash
ng test
```

If your CLI generated a different test runner, adapt the test imports/configuration to that runner while preserving the assertions.

## Playwright E2E

Install:

```bash
npm install -D @playwright/test
npx playwright install
```

Run:

```bash
npx playwright test
```

The Playwright config starts the Angular dev server automatically. If your project uses a different serve command, update `webServer.command`.

## Validation

- Queue displays the demo pending payments.
- Search by payment reference or beneficiary.
- Select a payment and approve it.
- Confirm the status changes to APPROVED.
- Confirm the unit test verifies state transition and pending count.
- Confirm the Playwright test completes the same critical workflow through the browser.

The app is an in-memory learning demo. Backend authorization and audit controls are not implemented.
