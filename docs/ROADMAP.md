# Angular Portfolio Roadmap

## Phase 1 – Audit Categories 01–10

Audit each project in the first ten folders:
- inspect project structure and project-level instructions
- install dependencies using the project's package manager and lockfile
- run the configured Angular build
- run configured automated tests
- start runnable applications and smoke-test key workflows
- record results in `VALIDATION-STATUS.md`

## Phase 2 – Category 11 quality review

Category 11 has been reported as validated. Before public release:
- retain project-level build/runtime evidence
- confirm each README has accurate setup instructions
- identify mock data versus real backend integration
- capture application screenshots
- review accessibility, responsive behavior and error states

## Phase 3 – Complete Category 12 integration

- run `npm pack` for the `banking-ui` library
- install the generated package in `accounts-mfe`
- import and render the shared components
- validate component styling and interactions
- configure Native Federation using the actual generated host/remote configuration
- expose the required remote modules
- load remotes dynamically from the host
- test remote loading, unavailable-remote and error states
- document startup order and local ports

## Phase 4 – GitHub publication

- keep root and project READMEs accurate
- add architecture diagrams and screenshots
- review `.gitignore` and remove generated build output and secrets
- verify setup instructions from a clean checkout where practical
- commit in logical milestones
- publish only claims supported by validation evidence
