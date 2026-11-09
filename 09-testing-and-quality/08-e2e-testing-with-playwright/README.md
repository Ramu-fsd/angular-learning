# End-to-end testing with Playwright

E2E tests validate the application as a user experiences it in a browser.

Install Playwright in the app workspace:

```bash
npm install -D @playwright/test
npx playwright install
```

Run tests:

```bash
npx playwright test
```

Use stable accessible selectors (`getByRole`, `getByLabel`) rather than brittle CSS selectors. Keep E2E tests focused on critical journeys, not every small state permutation.
