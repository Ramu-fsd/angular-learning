import { Routes } from '@angular/router';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    title: 'Customer Directory',
    loadComponent: () => import('./customers.page').then(m => m.CustomersPage)
  }
];
