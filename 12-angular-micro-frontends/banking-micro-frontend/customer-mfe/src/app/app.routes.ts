import { Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { CustomerDetailComponent } from './customer-detail.component';

export const routes: Routes = [
  { path: '', component: CustomerDashboardComponent },
  { path: ':id', component: CustomerDetailComponent },
  { path: '**', redirectTo: '' }
];
