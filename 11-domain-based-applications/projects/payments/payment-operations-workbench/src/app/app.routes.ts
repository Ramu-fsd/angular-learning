import { Routes } from '@angular/router';
export const routes: Routes = [
 {path:'',redirectTo:'dashboard',pathMatch:'full'},
 {path:'dashboard',loadComponent:()=>import('./features/dashboard/dashboard.component').then(m=>m.DashboardComponent)},
 {path:'payments',loadComponent:()=>import('./features/payments/payments.component').then(m=>m.PaymentsComponent)},
 {path:'payments/new',loadComponent:()=>import('./features/payments/payment-create.component').then(m=>m.PaymentCreateComponent)},
 {path:'payments/:id',loadComponent:()=>import('./features/payments/payment-detail.component').then(m=>m.PaymentDetailComponent)},
 {path:'**',redirectTo:'dashboard'}
];
