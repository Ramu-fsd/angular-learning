# Security and non-functional requirements

## Security
- Enforce role- and case-level authorization in backend services.
- Mask or tokenize sensitive customer and payment data in analyst views.
- Record case access, status transitions and rule changes in tamper-resistant audit storage.
- Protect APIs with authenticated sessions/tokens and server-side validation.
- Apply maker-checker controls to high-impact actions where required.
- Do not expose full card numbers, credentials, or secrets in the UI or logs.

## NFRs
- Performance: paginate large alert and case queues; avoid loading all history at once.
- Availability: align with fraud operations service SLO and provide graceful API error states.
- Scalability: scale alert ingestion and case APIs independently of the remote UI.
- Resilience: tolerate delayed alert feeds and support retry-safe case updates.
- Observability: correlate alert, case, customer and request identifiers across services.
- Accessibility: support keyboard navigation, visible focus and semantic status labels.
