# Healthcare Patient Administration Workbench

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

An Angular portfolio project demonstrating a patient administration workspace for a multi-specialty care provider. It includes synthetic patient records, appointment coordination, encounter summaries and billing/insurance claim tracking.

> All records are fictional. This is not a clinical decision-support system or an electronic medical record for real patients.

## Features
- Patient directory with search and status filters
- Patient profile with demographic and contact summary
- Appointment schedule and appointment status updates
- Encounter overview with clinician, department and visit summary
- Billing work queue with payer/claim status
- Create an appointment using a reactive form
- Signals-based state and typed HttpClient API boundary

## Stack
Angular standalone components, TypeScript, Angular Signals, Reactive Forms, HttpClient, Router and CSS.

## Setup

Create the application from this folder's parent:

```bash
ng new healthcare-patient-administration --standalone --routing --style=css
```

Replace the generated `src` folder with the supplied `src` folder. Copy `README.md` and `docs` into the project root.

```bash
npm install
ng serve --open
```

Production build:

```bash
ng build
```

## Suggested demo
1. Search for a patient and open the profile.
2. Review the appointment and encounter timeline.
3. Create an appointment using the form.
4. Update appointment status.
5. Review billing items and their claim statuses.

## Production boundaries
Use a compliant backend and identity platform for real patient data. Enforce least-privilege access, consent, purpose limitation, audit trails, retention policies, encryption, secure integrations and applicable healthcare privacy regulations. Clinical notes, diagnosis, medication and treatment decisions must be authored and validated by authorized clinical systems and professionals.
