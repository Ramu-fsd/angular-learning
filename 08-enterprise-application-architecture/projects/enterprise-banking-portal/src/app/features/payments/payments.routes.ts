import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: '',
    title: 'Payment Operations',
    loadComponent: () => import('./payments.page').then(m => m.PaymentsPage)
  }
];
