# Enterprise frontend case studies

## Banking customer portal
- Account overview and transaction history.
- Strong authentication and step-up verification.
- Data masking, session expiry, accessibility.
- API aggregation through gateway/BFF.

## Payment operations console
- Search and filter large payment queues.
- Maker-checker approval workflows.
- Idempotent commands and audit visibility.
- Real-time status updates with controlled freshness.

## KYC onboarding
- Multi-step forms and document uploads.
- Draft recovery without persisting sensitive documents in browser storage.
- Server-side validation and case status.
- Accessibility and upload security.

## Insurance claims portal
- Claim intake, evidence upload, workflow status.
- Large document handling and resumable upload considerations.
- Clear progress/error states.

## Healthcare appointment portal
- Privacy-aware patient workflows.
- Time-zone correctness and accessibility.
- Strict authorization and minimal data exposure.

## E-commerce checkout
- Inventory freshness and price recalculation.
- Payment provider integration.
- Idempotency and recovery from partial failures.
