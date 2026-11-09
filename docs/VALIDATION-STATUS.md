# Angular Portfolio – Validation Status

**Last updated:** 10 November 2026

This document records what is known from the development work so far. Update statuses only when supported by command output, test results or a documented browser smoke test.

## Category summary

| # | Category folder | Content status | Build status | Runtime / test status |
|---:|---|---|---|---|
| 01 | `01-angular-fundamentals` | Created previously | Not confirmed | Not confirmed |
| 02 | `02-angular-core-concepts` | Created previously | Not confirmed | Not confirmed |
| 03 | `03-angular-reactive-programming` | Created previously | Not confirmed | Not confirmed |
| 04 | `04-angular-advanced` | Created previously | Not confirmed | Not confirmed |
| 05 | `05-state-management` | Created previously | Not confirmed | Not confirmed |
| 06 | `06-angular-projects` | Created previously | Not confirmed | Not confirmed |
| 07 | `07-angular-springboot-integration` | Created previously | Not confirmed | Not confirmed |
| 08 | `08-enterprise-application-architecture` | Created previously | Not confirmed | Not confirmed |
| 09 | `09-testing-and-quality` | Created previously | Not confirmed | Not confirmed |
| 10 | `10-angular-system-design` | Created previously | Not confirmed | Not confirmed |
| 11 | `11-domain-based-applications` | User reports completed | User reports validated | User reports validated |
| 12 | `12-angular-micro-frontends` | Project packages created | Shared UI library build passed | End-to-end federation integration not confirmed |

## Category 11

The user previously confirmed that the ten domain-based applications had been validated. Preserve that user-reported status, but retain individual command logs or screenshots if you want auditable evidence for a public portfolio.

## Category 12 – confirmed evidence

### Shared UI library (`banking-ui`)

Workspace:
`12-angular-micro-frontends/banking-micro-frontend/banking-ui-workspace`

Confirmed during the current troubleshooting:
- Angular workspace created with `--no-create-application`.
- Library generated using `ng generate library banking-ui`.
- Five component folders are present: `bank-button`, `bank-card`, `bank-empty-state`, `bank-page-header`, `bank-status-pill`.
- `ng build banking-ui` completed successfully.
- Angular generated the library output under `dist/banking-ui`.

Still to validate:
- `npm pack` generates the distributable package.
- The package installs into `accounts-mfe`.
- The remote imports and renders shared components.
- Shared component styles and interactions work in the browser.

### Host and remotes

Intended local ports:
- Host: 4200
- Accounts: 4201
- Payments: 4202
- Customers: 4203
- Admin: 4204
- Fraud & Risk: 4205

The ports describe the intended setup, not proof that all applications have been started together. Dynamic remote loading and end-to-end federation behavior remain to be verified.

## Project-level audit checklist

For each project, record:

| Check | Evidence to capture |
|---|---|
| Dependency installation | `npm install` completes without unresolved dependency errors |
| Build | `ng build` or the documented project build script succeeds |
| Automated tests | The project's configured test command passes |
| Runtime | App starts and key screens render |
| Functional smoke test | Main user actions, validation and error states behave as expected |
| Integration | API, shared library or federation integration works where applicable |

Record the date, command, result and any known limitation. Do not mark a project validated solely because its source files exist.
