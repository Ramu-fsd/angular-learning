# Standalone components and provider architecture

Modern Angular supports standalone components and route-level providers.

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'payments',
    providers: [
      // Feature-scoped services can be provided here.
    ],
    loadChildren: () =>
      import('./features/payments/payments.routes').then(m => m.PAYMENT_ROUTES)
  }
];
```

Use root providers for app-wide dependencies. Use route-level providers when a service's lifetime should match a feature route. Understand provider scope before placing mutable state in a service.
