# Contributing

Thank you for improving this Angular learning and enterprise application portfolio.

## Project conventions

- Follow the Angular version and workspace configuration already used by each project.
- Prefer standalone components where supported by the project.
- Keep components focused and reusable.
- Keep business logic out of templates.
- Use realistic business-domain examples and synthetic/demo data.
- Document setup, scripts, architecture, API assumptions, tests and limitations.
- Never commit credentials, tokens, private certificates or real customer data.

## Before committing changes

From the relevant application or library workspace:

1. Install dependencies using the package manager and lockfile used by that project.
2. Run the configured build.
3. Run configured tests.
4. Start the application and smoke-test changed flows where practical.
5. Update the relevant README and `docs/VALIDATION-STATUS.md`.

## Commit message examples

- `feat(angular-forms): add reactive form examples`
- `fix(accounts-mfe): correct shared component import`
- `docs(angular): update portfolio validation status`
- `test(angular-routing): add route guard tests`

Keep commits focused on one category or meaningful change. Do not claim build, runtime or integration validation unless it has actually been performed.
