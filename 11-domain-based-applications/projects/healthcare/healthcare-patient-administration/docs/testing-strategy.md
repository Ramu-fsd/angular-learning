# Testing strategy

## Unit tests
- Patient and appointment filtering.
- Appointment count derivation.
- Appointment creation and status updates.
- Billing queue filters.

## Component tests
- Patient directory empty and populated states.
- Patient profile and encounter history.
- Appointment form validation.
- Appointment status update controls.
- Billing status rendering.

## Integration / E2E
- Patient directory to profile navigation.
- Appointment creation and schedule refresh.
- Billing search and payer status filters.
- Authorization denial for unauthorized patient access.
- Audit event creation for profile access and updates.

Use synthetic test data only. Do not commit actual patient, clinical, insurance or payment information.
