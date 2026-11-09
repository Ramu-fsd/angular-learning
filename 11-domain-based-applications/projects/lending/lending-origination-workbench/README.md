# Lending & Loan Origination Workbench

**Author:** Ramu Boya

A standalone Angular portfolio project demonstrating a retail lending workflow: application intake, eligibility review, affordability indicators, document checklist, underwriting assessment, and loan decision tracking.

## Create and run

Use your locally installed Angular CLI:

```bash
ng new lending-origination-workbench --standalone --routing --style=css
```

Choose standard Zone.js if prompted. Replace the generated `src` folder with this package's `src` folder. Copy `docs/` and this README into the workspace root.

```bash
npm install
ng serve --open
ng build
```

If port 4200 is already in use:

```bash
ng serve --open --port 4201
```

## Demo limitations

All applicants, income figures, credit indicators, and loan decisions are synthetic. State is held in memory and resets on refresh. This is not a credit scoring engine, underwriting policy, financial advice, or a production loan origination system. Backend services must own eligibility, affordability calculations, credit bureau integration, decision policy, authorization, and audit.
