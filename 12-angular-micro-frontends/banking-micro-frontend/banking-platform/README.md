# Banking Micro Frontend Integration Platform

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

The final capstone workspace for the Angular Banking Micro Frontend portfolio. It documents and provides a host-side integration dashboard for five business-domain remotes: Accounts, Payments, Customer Management, Admin Portal, and Fraud & Risk.

## Portfolio structure

| Application | Remote key | Local port | Target folder |
|---|---|---:|---|
| Banking Shell / Host | host | 4200 | `banking-mfe-shell` |
| Accounts | `accounts` | 4201 | `accounts-mfe` |
| Payments | `payments` | 4202 | `payments-mfe` |
| Customer Management | `customers` | 4203 | `customer-mfe` |
| Admin Portal | `admin` | 4204 | `admin-mfe` |
| Fraud & Risk | `fraud-risk` | 4205 | `fraud-risk-mfe` |
| Shared UI library | `banking-ui` | — | `banking-ui-workspace` |

## Create the capstone app

From the `banking-micro-frontend` parent folder:

```bash
ng new banking-platform --standalone --routing --style=css
```

Replace the generated `src` folder with this ZIP's `src` folder. Copy this README and `docs` to the project root. Then:

```bash
cd banking-platform
npm install
ng add @angular-architects/native-federation-v4
```

Select **Dynamic Host** (or the host option offered by your installed package), project `banking-platform`, port `4200`. Keep all generated Native Federation files.

Run:

```bash
ng serve --open --port 4200
```

Build:

```bash
ng build
```

## Important integration note
This ZIP is the integration capstone starter and integration runbook. The dashboard catalog and checklist work locally, but the remote cards are not wired to dynamically load the other apps by themselves. Complete the Native Federation manifest and route wiring using the exact remote entry and exposed module names generated in each app. See `docs/federation-runbook.md`.

## Suggested development sequence
1. Validate each remote standalone on its assigned port.
2. Validate the host standalone on port `4200`.
3. Configure host federation manifest for all five remotes.
4. Expose a component or route from each remote using its generated federation configuration.
5. Add host routes and navigation for each exposed remote.
6. Run cross-remote integration and failure-mode checks.

## Synthetic data
This portfolio uses synthetic demo data. It is not connected to real banking, customer, payment, identity or fraud services.
