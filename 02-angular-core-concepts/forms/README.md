# Reactive Forms

## Business scenario
A customer onboarding workflow captures identity and contact details for KYC review. The form validates required fields and confirms that the customer has acknowledged the privacy notice before allowing the request to be submitted.

## Concepts
- `FormGroup`, `FormControl`, and `FormArray`.
- Built-in validators and custom validators.
- Cross-field validation.
- Typed reactive forms.
- `value`, `getRawValue()`, `dirty`, `touched`, `valid`, and `pending`.
- Server-side validation remains authoritative.

## Example
`kyc-onboarding.component.ts` demonstrates typed controls and a cross-field validator.

## Practice
1. Add a FormArray for address history.
2. Add async verification of a synthetic customer reference.
3. Display field-level errors accessibly.
4. Ensure no full identity document number is logged or displayed.
