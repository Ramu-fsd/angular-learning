import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'payments',
    loadChildren: () =>
      import('./payments/payments.routes').then((m) => m.PAYMENT_ROUTES)
  },
  { path: '', pathMatch: 'full', redirectTo: 'payments' }
];
