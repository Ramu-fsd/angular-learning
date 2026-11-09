# User Journeys

## View accounts
1. Customer signs in through the identity provider.
2. Angular requests entitled accounts.
3. API returns masked account number, type, currency, and available balance.
4. UI renders loading, success, empty, or error state.

## Search transactions
1. Customer selects an account and date range.
2. UI sends query, paging, and sort parameters.
3. Backend returns a page and total count.
4. UI displays transaction details and data freshness.

## Add a beneficiary
1. Customer enters beneficiary name, bank, and account number.
2. UI performs format validation.
3. Backend verifies eligibility, applies risk checks, and may require step-up authentication.
4. Backend returns pending verification status.
5. UI displays the authoritative status; it must not assume activation.

## Submit a service request
1. Customer selects a request type and enters a description.
2. UI validates required fields.
3. Backend creates a request and returns a reference.
4. UI shows the reference and current status.
