# Testing strategy

## Unit tests

- Customer search matches ID, name, email, and city.
- Segment and relationship-status filters work independently and together.
- Portfolio metrics calculate total, active, review-required, and relationship value.
- Customer lookup returns a profile or undefined.
- Initials and status labels render expected values.

## Component tests

- Directory displays customer cards and summary metrics.
- Search and filters update the result set.
- Selecting a customer opens the correct profile.
- Profile shows contact information, linked accounts, and interaction history.
- Empty interaction and not-found states render correctly.

## Federation integration tests

- Host loads the customer remote entry.
- Customer route supports browser refresh with SPA fallback.
- Remote-load failure does not crash the host.
- Remote origin is permitted only by the approved CSP/CORS policy.

## Data safety

Use only synthetic customer data. Never paste real customer records or personal contact details into this repository.
