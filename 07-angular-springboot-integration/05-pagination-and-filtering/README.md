# Server-side pagination and filtering

For large customer or transaction datasets, filtering and pagination should generally happen on the server.

Suggested API contract:

`GET /api/customers?page=0&size=20&sort=fullName,asc&search=ram`

Suggested response:

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 0,
  "totalPages": 0
}
```

Consider:
- Whitelisted sortable fields (never concatenate arbitrary client input into SQL).
- Stable sorting with a unique tie-breaker.
- Maximum page size.
- Debounced search requests.
- Cancellation/stale-response handling.
- Empty, loading, and error states.
