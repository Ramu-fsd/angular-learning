# 06 - Angular Projects Portfolio

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This folder contains independently runnable Angular applications, organized by complexity. Each application keeps its own Angular CLI configuration, dependencies, tests, and README.

> Existing application source code is intentionally not included in this documentation package. Copy your eight already-tested projects into the mapped folders below; do not replace their source or workspace files.

## Project catalog

### Beginner projects — `01-beginner-projects/`

| # | Existing project folder | Main concepts |
|---|---|---|
| 01 | `angular-counter-app` | Component state, event binding, interpolation |
| 02 | `angular-login-form` | Forms, validation, input handling |
| 03 | `angular-stopwatch-app` | Lifecycle, intervals, cleanup |
| 04 | `angular-todo-app` | CRUD, lists, conditional rendering |

### Intermediate projects — `02-intermediate-projects/`

| # | Existing project folder | Main concepts |
|---|---|---|
| 05 | `angular-dashboard-app` | Dashboard composition, reusable components, charts/widgets |
| 06 | `angular-product-catalog` | API integration, product listing, filtering |
| 07 | `angular-search-filter` | Search, filtering, RxJS/Signals, reusable UI |

### Advanced projects — `03-advanced-projects/`

| # | Existing project folder | Main concepts |
|---|---|---|
| 08 | `angular-ecommerce-app` | Feature architecture, cart/checkout workflows, routing, state |

## Recommended final layout

```text
06-angular-projects/
├── README.md
├── PROJECT-CATALOG.md
├── PROJECT-STANDARDS.md
├── BUILD-RUN-VALIDATION.md
├── 01-beginner-projects/
│   ├── angular-counter-app/
│   ├── angular-login-form/
│   ├── angular-stopwatch-app/
│   └── angular-todo-app/
├── 02-intermediate-projects/
│   ├── angular-dashboard-app/
│   ├── angular-product-catalog/
│   └── angular-search-filter/
└── 03-advanced-projects/
    └── angular-ecommerce-app/
```

## How to move each project

1. Copy the entire existing project folder into its mapped category.
2. Preserve `package.json`, lockfile, `angular.json`, `tsconfig*.json`, `src`, tests, and project README.
3. Do not copy `node_modules`.
4. Keep each app independently installable and runnable.
5. Add or update the app README using `PROJECT-README-TEMPLATE.md` in this package.
6. Verify each app before committing the consolidated repository.

## Build and run

Open a terminal in the individual project directory, not the category root:

```bash
npm install
ng serve --open
```

If the project uses npm scripts, `npm start` may be available; check its own `package.json`.

Production build:

```bash
ng build
```

Run tests using the script or Angular CLI test command configured by that project's Angular version:

```bash
ng test
```

## Portfolio quality gate

Before pushing:
- Every project has a meaningful README and screenshots where useful.
- Every project can install dependencies independently.
- `node_modules`, `dist`, coverage, local environment files, and secrets are excluded from Git.
- No API keys, passwords, tokens, customer data, or production endpoints are committed.
- Build and test commands are documented and have been run locally.
- Root documentation links to each project README.
