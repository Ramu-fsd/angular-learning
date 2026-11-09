import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    title: 'Overview | Enterprise Banking',
    loadComponent: () => import('./features/overview/overview.page').then(m => m.OverviewPage)
  },
  {
    path: 'customers',
    title: 'Customers | Enterprise Banking',
    loadChildren: () => import('./features/customers/customers.routes').then(m => m.CUSTOMER_ROUTES)
  },
  {
    path: 'payments',
    title: 'Payments | Enterprise Banking',
    loadChildren: () => import('./features/payments/payments.routes').then(m => m.PAYMENT_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
