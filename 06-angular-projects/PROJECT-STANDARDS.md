# Project Standards

## 1. Independence

Each app should have its own:
- `package.json` and lockfile
- `angular.json`
- `tsconfig` files
- `src/`
- tests and test configuration
- `README.md`

Do not create one shared root `node_modules` for all projects. Do not merge Angular CLI workspaces unless there is a deliberate migration plan.

## 2. Git hygiene

Recommended `.gitignore` entries at repository root:

```gitignore
**/node_modules/
**/dist/
**/coverage/
**/.angular/
**/.cache/
**/.DS_Store
**/Thumbs.db

.env
.env.*
!.env.example
```

Review existing project `.gitignore` files before consolidation. Keep environment examples with placeholders only.

## 3. README standard

Every app README should state:
- Business problem and intended user
- Key features
- Angular and Node compatibility expectations
- Prerequisites
- Install, run, build, and test commands
- Environment configuration
- API dependencies and sample data
- Validation scenarios
- Screenshots
- Known limitations and security notes

## 4. Code quality

- Prefer standalone components for modern Angular projects.
- Use typed models and avoid `any` where practical.
- Keep components focused on presentation and interaction.
- Put API access behind services.
- Model loading, empty, success, and error states.
- Use reactive forms for complex forms.
- Clean up subscriptions and long-lived resources.
- Add accessibility labels, semantic HTML, and keyboard support.
- Keep business authorization and validation on the backend.

## 5. Fintech and enterprise realism

Use synthetic data only. Examples can represent banking, payments, fraud operations, KYC, lending, insurance, healthcare, e-commerce, logistics, telecom, and enterprise operations. Never include real customer information or production credentials.
