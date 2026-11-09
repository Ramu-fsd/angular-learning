# Performance Optimization

## Business scenario
A payment operations screen displays thousands of payment records. The goal is to keep interactions responsive and initial loading fast.

## Techniques
- Track repeated records by stable identity (`track payment.id`).
- Prefer server-side pagination, filtering, and sorting for large datasets.
- Lazy-load routes and feature areas.
- Use OnPush and Signals with clear state boundaries.
- Avoid expensive template expressions and repeated object creation.
- Use virtual scrolling only when it improves a measured bottleneck.
- Compress and optimize images/assets; inspect bundle output.
- Set realistic bundle budgets in `angular.json`.
- Profile with Chrome DevTools and Angular DevTools before and after changes.

## Example
`large-payment-list.component.ts` shows stable identity tracking and client-side pagination for a small synthetic dataset. For production-scale data, move pagination and filtering to the backend.

## Validation exercise
1. Generate a production build.
2. Inspect bundle sizes and lazy chunks.
3. Profile initial rendering and filtering.
4. Record before/after metrics in `performance-results-template.md`.
