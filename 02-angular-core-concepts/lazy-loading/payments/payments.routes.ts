import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./payments-home.component').then((m) => m.PaymentsHomeComponent)
  },
  {
    path: 'review',
    loadComponent: () =>
      import('./payment-review-page.component').then((m) => m.PaymentReviewPageComponent)
  }
];
