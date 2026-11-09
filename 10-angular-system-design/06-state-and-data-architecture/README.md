# State and data architecture

Choose state ownership deliberately:
- Component state: temporary UI details.
- Feature state: workflow state shared across a feature.
- Global state: genuinely cross-feature state.
- Server state: remote data with freshness, caching, and invalidation.

Avoid duplicate sources of truth. Derived totals should be computed. Define how stale data is identified and refreshed. Financial records remain authoritative in backend systems.
