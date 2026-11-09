# Scalability and performance

Frontend scaling is not the same as adding more Angular pods. A static Angular application can be served through a CDN, while API capacity is scaled independently.

Consider:
- CDN caching for fingerprinted static assets.
- Lazy-loaded route chunks.
- Bundle budgets and dependency analysis.
- Server-side pagination and filtering.
- Virtual scrolling for very large datasets.
- Image optimization and font loading.
- Avoiding duplicate API requests.
- Browser memory and CPU usage.
- Core Web Vitals: LCP, INP, CLS.
- API p95/p99 latency and payload size.

Example performance objectives (illustrative; validate with product owners):
- Initial route interactive within an agreed target on supported devices.
- Critical user actions receive visible feedback immediately.
- Large tables use server-side paging rather than downloading every row.
