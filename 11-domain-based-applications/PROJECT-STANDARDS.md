# Domain Project Standards

## Folder conventions

- `core/`: app-wide services, interceptors, guards, configuration.
- `shared/`: reusable presentational components and pipes.
- `features/`: business capabilities grouped by domain.
- `models/`: typed API and view models.
- `data-access/`: API clients, repositories, adapters.
- `testing/`: test data and utilities where needed.

## Frontend rules

1. Keep domain rules authoritative on the backend.
2. Separate API models from UI view models when transformation is needed.
3. Use reactive forms for complex user input.
4. Use Signals or RxJS intentionally; avoid duplicate state sources.
5. Model loading, empty, success, and error states.
6. Use server-side pagination for large datasets.
7. Use accessible labels, keyboard navigation, and semantic markup.
8. Do not persist tokens or sensitive customer documents in local storage.
9. Use correlation IDs and structured error handling.
10. Never commit real customer, payment, identity, or health data.

## API contract conventions

Use typed request/response models, consistent error envelopes, pagination metadata, explicit timestamps/time zones, and documented idempotency behavior for commands.
