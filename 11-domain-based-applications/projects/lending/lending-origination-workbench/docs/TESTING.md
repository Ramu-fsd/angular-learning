# Testing checklist

- Application search and pipeline filters work together.
- Loan amount, term, and purpose are displayed consistently.
- Document review updates only the selected document.
- Assessment indicators and missing evidence are visible to the underwriter.
- Decision action validates required fields and allowed transitions.
- API errors and unauthorized responses are handled safely.
- Sensitive applicant details remain masked in queue views.

Suggested E2E flow: open an application, review income evidence, add an underwriter note, move the case to `MORE_INFORMATION_REQUIRED`, and verify the queue status.
