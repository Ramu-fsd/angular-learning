import { Routes } from '@angular/router';
import { demoAuthGuard } from './security/demo-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./payment-operations/payment-queue.component')
        .then((m) => m.PaymentQueueComponent)
  },
  {
    path: 'operations',
    canActivate: [demoAuthGuard],
    loadComponent: () =>
      import('./payment-operations/operations-home.component')
        .then((m) => m.OperationsHomeComponent)
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./security/sign-in.component')
        .then((m) => m.SignInComponent)
  },
  { path: '**', redirectTo: '' }
];
