# Angular Learning & Enterprise Applications

A progressive Angular portfolio covering core Angular development, reactive programming, state management, enterprise application architecture, testing, system design, domain-based applications and micro-frontends.

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

## Objectives

- Build a structured Angular learning path from fundamentals to enterprise-level application design.
- Practice Angular, TypeScript, RxJS, Signals, routing, forms, HTTP integration and testing.
- Build realistic fintech and enterprise applications using business-domain workflows.
- Explore Angular with Spring Boot backend integration.
- Demonstrate reusable UI components and micro-frontend architecture.
- Document architecture, design decisions, API assumptions, testing and non-functional requirements.

## Technology baseline

- Angular CLI 20.x (the development environment used during this portfolio work reported 20.0.3)
- TypeScript, HTML and CSS
- RxJS and Angular Signals
- Angular Router, Reactive Forms and HttpClient
- Angular testing tools configured per project
- Native Federation for selected micro-frontend applications

Each project may have its own dependency versions and scripts. Always follow the project-level `package.json` and README.

## Repository structure

```text
angular-learning/
├── 01-angular-fundamentals/
├── 02-angular-core-concepts/
├── 03-angular-reactive-programming/
├── 04-angular-advanced/
├── 05-state-management/
├── 06-angular-projects/
├── 07-angular-springboot-integration/
├── 08-enterprise-application-architecture/
├── 09-testing-and-quality/
├── 10-angular-system-design/
├── 11-domain-based-applications/
├── 12-angular-micro-frontends/
├── docs/
├── .editorconfig
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Learning roadmap

| # | Folder | Coverage | Portfolio status |
|---:|---|---|---|
| 01 | `01-angular-fundamentals` | Angular foundations and introductory development | Content created; validation audit pending |
| 02 | `02-angular-core-concepts` | Core Angular concepts and component development | Content created; validation audit pending |
| 03 | `03-angular-reactive-programming` | Reactive programming and RxJS | Content created; validation audit pending |
| 04 | `04-angular-advanced` | Advanced Angular concepts and patterns | Content created; validation audit pending |
| 05 | `05-state-management` | Application state and state-management approaches | Content created; validation audit pending |
| 06 | `06-angular-projects` | Practical Angular applications and projects | Content created; validation audit pending |
| 07 | `07-angular-springboot-integration` | Angular and Spring Boot integration | Content created; validation audit pending |
| 08 | `08-enterprise-application-architecture` | Enterprise application architecture | Content created; validation audit pending |
| 09 | `09-testing-and-quality` | Testing and software quality practices | Content created; validation audit pending |
| 10 | `10-angular-system-design` | Angular-oriented system design | Content created; validation audit pending |
| 11 | `11-domain-based-applications` | Domain-specific business applications | User-reported validated |
| 12 | `12-angular-micro-frontends` | Host, remotes, shared UI library and integration capstone | Project work completed; end-to-end integration checks remain |

The status column deliberately distinguishes content creation from build, runtime, test and integration validation. See [VALIDATION-STATUS.md](docs/VALIDATION-STATUS.md).

## Category 11 – Domain-Based Applications

The domain portfolio includes the following applications:

1. Banking – Digital Banking Portal
2. Payments – Operations Workbench
3. Fraud Detection – Investigation Console
4. KYC – Compliance Workbench
5. Lending – Loan Origination
6. Insurance – Policy & Claims
7. Healthcare – Patient Administration
8. Ecommerce – Order Fulfilment
9. Logistics – Shipment & Fleet
10. Enterprise Operations – Workbench

The applications are intended as portfolio demonstrations. Treat workflows and data as synthetic/demo content unless an individual project explicitly documents a live backend integration.

## Category 12 – Angular Micro Frontends

The banking micro-frontend group contains:

1. Banking Micro Frontend Shell – host
2. Accounts Micro Frontend Remote
3. Payments Micro Frontend Remote
4. Customer Management Micro Frontend Remote
5. Admin Portal Micro Frontend
6. Fraud & Risk Micro Frontend
7. Shared UI / Design System Library
8. Banking Platform Integration Capstone

### Intended local development ports

| Application | Port |
|---|---:|
| Banking shell / platform host | 4200 |
| Accounts remote | 4201 |
| Payments remote | 4202 |
| Customer remote | 4203 |
| Admin remote | 4204 |
| Fraud & Risk remote | 4205 |
| Shared UI library | Not applicable (Angular library) |

Ports are the intended local development assignments; confirm the generated federation and serve configuration in each project before running the applications together.

### Shared UI library validation

The `banking-ui` Angular library was generated in `banking-ui-workspace`, and `ng build banking-ui` completed successfully. This verifies the library build only. Creating a package with `npm pack`, installing it into `accounts-mfe`, importing the components and checking their browser rendering are the next validation steps.

### Federation integration status

The integration capstone currently provides an integration starter/dashboard and supporting runbook. Do not describe the remotes as dynamically integrated until the host federation configuration, exposed remote modules and runtime loading have been implemented and tested together.

## Working with a project

Open the individual application or library folder and follow its README. Typical Angular application commands are:

```bash
npm install
ng serve
```

Build an application:

```bash
ng build
```

Run the commands from the workspace that contains the relevant `angular.json`. For Native Federation projects, use the scripts and configuration generated for that specific project.

Build the shared UI library from its workspace:

```bash
ng build banking-ui
```

## Validation levels

Use these definitions consistently:

1. **Created** – source files and documentation are present.
2. **Build validated** – dependency installation and the configured build complete successfully.
3. **Runtime validated** – the application starts and key screens and workflows work in a browser.
4. **Test validated** – the configured automated tests pass.
5. **Integration validated** – relevant APIs, shared libraries or federated remotes work together.

A project should not be labelled fully validated based only on the presence of source files.

## Recommended next steps

1. Commit the current portfolio and root documentation with accurate validation notes.
2. Audit Categories 01–10 project by project: inspect files, install dependencies, build, run and test where applicable.
3. Complete the shared library package-consumption test in `accounts-mfe`.
4. Configure and validate dynamic host-to-remote loading for Category 12.
5. Capture screenshots and architecture diagrams, then review GitHub presentation.

## Disclaimer

This is a learning and portfolio repository. Demo workflows and synthetic data are not production financial, healthcare, identity or compliance services. Production systems require appropriate backend services, security controls, authorization, observability, resilience, accessibility and regulatory review.
