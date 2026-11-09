# KYC Onboarding & Compliance Workbench
**Author:** Ramu Boya

Angular portfolio project for customer onboarding, document review, due-diligence checklists, screening summaries, analyst notes and case decisions. All records are synthetic; the app does not perform real identity verification or sanctions screening.

## Setup
Create a workspace using your installed Angular CLI:
```bash
ng new kyc-compliance-workbench --standalone --routing --style=css
```
Choose standard Zone.js if prompted. Replace the generated `src` folder with this package's `src`, then:
```bash
npm install
ng serve --open
ng build
```
If port 4200 is busy: `ng serve --open --port 4201`.

Demo state is in memory and resets on refresh. Backend services must own verification, screening, authorization, evidence retention, and final decisions.
