# 11 - Angular Domain-Based Applications

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This category brings Angular concepts together through realistic business-domain applications. The focus is on workflows, domain terminology, API boundaries, security, validation, state ownership, and enterprise NFRs.

## Domain portfolio

| Domain | Suggested application | Key capabilities |
|---|---|---|
| Banking | Digital banking customer portal | Accounts, balances, transactions, beneficiaries |
| Payments | Payment operations workbench | Queue, status, approval, exception handling |
| Fraud | Fraud investigation console | Risk alerts, case assignment, investigation |
| KYC | Customer onboarding | Profile capture, document checklist, review |
| Lending | Loan origination portal | Application, eligibility, documents, decision |
| Insurance | Claims management | Claim intake, evidence, assessment, status |
| Healthcare | Appointment and patient portal | Scheduling, visit summary, privacy controls |
| E-commerce | Commerce operations | Catalog, cart, checkout, order tracking |
| Logistics | Shipment visibility | Tracking, milestones, delivery exceptions |
| Telecom | Subscriber self-service | Plans, usage, billing, support cases |

## Included runnable applications

1. `projects/digital-banking-portal`
2. `projects/payment-operations-workbench`
3. `projects/fraud-investigation-console`
4. `projects/kyc-onboarding-workbench`

Each project is an independent Angular source starter. Create a workspace using your installed Angular CLI, replace its `src` folder with the corresponding project `src`, then install and run.

## Run any included application

Example for Digital Banking Portal:

```bash
ng new digital-banking-portal --standalone --routing --style=css
cd digital-banking-portal
```

Replace the generated `src` folder with `projects/digital-banking-portal/src`, then:

```bash
npm install
ng serve --open
```

Production build:

```bash
ng build
```

Repeat with the matching workspace name and source folder for each application. The projects use standalone Angular components and built-in Signals; no third-party UI library is required.

## Validation checklist

- Application starts with `ng serve`.
- Production compilation completes with `ng build`.
- Search/filter controls update the displayed data.
- Workflow actions update local demo state.
- Responsive layout works on desktop and mobile widths.
- No secrets or real customer information are added to source control.

## Important implementation boundary

These are frontend portfolio/demo applications with in-memory sample data. They do not implement production authentication, backend authorization, payment execution, fraud decisioning, KYC verification, or regulatory controls. In a real enterprise system, enforce business rules and permissions in backend services, persist auditable state, protect sensitive data, and integrate with approved identity and API platforms.
