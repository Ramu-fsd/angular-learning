# Loan origination architecture

```text
Angular Lending Workbench
  ├── Application pipeline
  ├── Applicant and facility profile
  ├── Document checklist
  ├── Underwriting assessment
  └── Decision workspace
        |
        v
API Gateway / BFF
  ├── Loan Origination Service
  ├── Customer & Identity Service
  ├── Document Management Service
  ├── Credit Bureau Adapter
  ├── Affordability / Policy Engine
  ├── Underwriting & Decision Service
  └── Audit / Notification Services
        |
        v
Loan application store · Document store · Bureau integrations · Audit store
```

The frontend presents workflow state. Authoritative credit data, eligibility, affordability, policy rules, and final decisions belong to secured backend services.
