# Observability and performance

Enterprise frontend telemetry should help trace user journeys without leaking sensitive data.

Measure:
- Web Vitals and route transition timing.
- API latency and failure rates.
- Client-side exceptions.
- Bundle size and lazy-chunk loading.
- User workflow outcomes using privacy-safe event names.

Performance practices:
- Lazy-load feature routes.
- Use `OnPush` where appropriate and understand Signals-driven change detection.
- Track list rows with stable IDs.
- Avoid expensive template expressions.
- Use image optimization and sensible caching.
- Set bundle budgets and review regressions in CI.
- Cancel stale requests and avoid duplicate subscriptions.
