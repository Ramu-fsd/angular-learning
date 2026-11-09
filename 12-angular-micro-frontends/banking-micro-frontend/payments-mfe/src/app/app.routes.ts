import { Routes } from '@angular/router';
import { PaymentsDashboardComponent } from './payments-dashboard.component';
import { PaymentDetailComponent } from './payment-detail.component';
import { CreatePaymentComponent } from './create-payment.component';

export const routes: Routes = [
  { path: '', component: PaymentsDashboardComponent },
  { path: 'new', component: CreatePaymentComponent },
  { path: ':id', component: PaymentDetailComponent },
  { path: '**', redirectTo: '' }
];
