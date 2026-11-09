# Quality gates and CI

Recommended pipeline stages:
1. Install from lockfile.
2. Formatting and lint.
3. Type check / Angular build.
4. Unit tests and coverage.
5. Component/integration tests.
6. E2E critical-path tests.
7. Dependency and secret scanning.
8. Accessibility and bundle budget checks.

Set quality thresholds based on risk and codebase maturity. Coverage percentage alone does not prove meaningful test quality. Protect payment, onboarding, authentication, and authorization paths with explicit behavior tests.
