import { Routes } from '@angular/router';
import { authenticatedGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login-placeholder.component').then((m) => m.LoginPlaceholderComponent)
  },
  {
    path: 'operations/payments',
    canActivate: [authenticatedGuard],
    loadComponent: () =>
      import('../services/payment-review.component').then((m) => m.PaymentReviewComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: 'operations/payments' },
  { path: '**', redirectTo: 'operations/payments' }
];
