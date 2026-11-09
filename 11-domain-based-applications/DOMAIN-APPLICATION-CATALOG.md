# Domain Application Catalog

## 1. Banking — Digital Banking Portal
**Personas:** retail customer, relationship manager, support agent.  
**Core screens:** account overview, transaction history, beneficiary management, profile and service requests.  
**Backend boundaries:** customer, account, transaction, beneficiary, notification services.  
**NFR focus:** confidentiality, accessibility, transaction correctness, availability, data freshness.

## 2. Payments — Payment Operations Workbench
**Personas:** payment operations analyst, approver, supervisor.  
**Core screens:** payment queue, filters, payment detail, exception review, approval history.  
**Backend boundaries:** payment orchestration, screening, ledger, audit.  
**NFR focus:** idempotency, maker-checker, auditability, queue freshness, safe recovery.

## 3. Fraud — Fraud Investigation Console
**Personas:** fraud analyst, investigator, team lead.  
**Core screens:** alert queue, risk indicators, customer context, case notes, disposition.  
**Backend boundaries:** detection, case management, customer profile, evidence, audit.  
**NFR focus:** low-latency alert visibility, traceability, role-based access, evidence integrity.

## 4. KYC — Customer Onboarding Workbench
**Personas:** applicant, onboarding specialist, compliance reviewer.  
**Core screens:** profile capture, document checklist, verification status, review queue.  
**Backend boundaries:** customer, document management, identity verification, compliance.  
**NFR focus:** privacy, secure upload, validation, accessibility, retention policy.

## 5. Lending — Loan Origination
Application intake, affordability inputs, document collection, underwriting status, decision communication. Backend owns eligibility and credit decisions.

## 6. Insurance — Claims Management
Claim registration, evidence upload, adjuster assignment, assessment milestones, settlement status. Protect policyholder and claimant data.

## 7. Healthcare — Patient Portal
Appointments, visit summaries, care instructions, and secure messaging. Minimize data exposure and meet applicable privacy and accessibility requirements.

## 8. E-commerce — Commerce Operations
Product catalog, cart, checkout, order tracking, returns. Treat price and inventory as server-authoritative.

## 9. Logistics — Shipment Visibility
Shipment search, tracking milestones, delivery exceptions, proof-of-delivery status. Account for event ordering and delayed updates.

## 10. Telecom — Subscriber Self-Service
Plan details, usage, invoices, service requests, and outage communication. Protect subscriber identity and billing data.

## Cross-domain architecture questions
- Which user journeys are business-critical?
- What data is authoritative and where is it stored?
- Which operations are commands versus queries?
- What is the authorization model?
- What data can be cached, and for how long?
- How are retries, duplicate submissions, and partial failures handled?
- What must be audited?
- How will the UI expose stale or incomplete information?
