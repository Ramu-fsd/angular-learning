# Insurance Policy & Claims Workbench

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

An Angular standalone application demonstrating an insurance operations workspace for policy servicing and claims handling. The project uses synthetic data and an in-memory API service.

## Business capabilities
- Policy portfolio with search and status filtering
- Policy detail view with coverage and premium summary
- Claims queue with status and priority indicators
- Claim detail with loss summary, reserve, evidence checklist and adjuster assignment
- Claim status updates and operational notes
- Signals-based local state and typed service boundaries

## Technology
- Angular standalone components and routing
- TypeScript
- Angular Signals
- Reactive Forms
- HttpClient with a replaceable API boundary
- CSS

## Create the Angular application

From this folder's parent directory:

```bash
ng new insurance-policy-claims-workbench --standalone --routing --style=css
```

Copy the supplied `src` folder into the generated project, replacing its `src` folder. Copy this README and the `docs` folder into the project root.

Then run:

```bash
npm install
ng serve --open
```

Production build:

```bash
ng build
```

## Demo credentials and data
No login is required. All records are synthetic and held in browser memory. Refreshing the page resets changes.

## Suggested walkthrough
1. Review the portfolio and filter active policies.
2. Open a policy and inspect coverage, premium and insured details.
3. Open the claims queue and filter by status.
4. Review a claim's loss details and evidence checklist.
5. Assign an adjuster, add an operational note and move the claim through its workflow.

## Important production considerations
This is a portfolio learning project, not an insurance decision engine. Real policy eligibility, coverage interpretation, fraud checks, reserves, claim settlement, payment authorization and audit evidence must be enforced by trusted backend services. Do not use real customer or health information.
