# Banking Shared UI – Design System Library

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

An Angular 20 library of reusable, standalone UI components for the Banking Micro Frontend portfolio. The library establishes consistent interaction patterns, spacing, typography and status presentation across Accounts, Payments, Customers, Admin and Fraud & Risk remotes.

## Components
| Component | Selector | Purpose |
|---|---|---|
| Button | `bank-button` | Primary, secondary, danger and ghost actions; sizes and loading state |
| Card | `bank-card` | Consistent content surface with optional interactive treatment |
| Status pill | `bank-status-pill` | Success, warning, danger, info and neutral states |
| Page header | `bank-page-header` | Shared title, eyebrow, description and action slot |
| Empty state | `bank-empty-state` | Consistent empty/loading-result placeholder and action slot |

All components are standalone and exported from `projects/banking-ui/src/public-api.ts`.

## Create workspace and library
From the parent `banking-micro-frontend` directory:

```bash
ng new banking-ui-workspace --no-create-application
cd banking-ui-workspace
ng generate library banking-ui
```

Copy this ZIP's `projects/banking-ui/src/lib` and `projects/banking-ui/src/public-api.ts` into the generated library at the same paths. Copy the docs folder and README to the workspace root.

Keep the generated `ng-package.json`, `tsconfig` files, package metadata and Angular CLI workspace configuration.

Build the library:

```bash
ng build banking-ui
```

## Use from a remote in the same workspace
After building the library, add it as a dependency in the consuming application's `package.json` using the generated package name (typically `banking-ui`), or configure a workspace path mapping if you are maintaining a monorepo with the library and apps together.

Example component usage:

```ts
import { BankButtonComponent, BankCardComponent, BankStatusPillComponent } from 'banking-ui';

@Component({
  standalone: true,
  imports: [BankButtonComponent, BankCardComponent, BankStatusPillComponent],
  template: `
    <bank-card>
      <bank-status-pill status="success">Completed</bank-status-pill>
      <bank-button variant="primary">View payment</bank-button>
    </bank-card>
  `
})
export class ExampleComponent {}
```

## Design principles
- Standalone-first components for federation-friendly Angular applications.
- Semantic status variants and clear action hierarchy.
- Content projection for application-specific content.
- No dependency on a banking backend or third-party UI framework.
- Keep business logic, authorization and data fetching in consuming applications/services.
