import { Routes } from '@angular/router';
import { LendingDashboardComponent } from './features/dashboard/lending-dashboard.component';
import { LoanDetailComponent } from './features/detail/loan-detail.component';

export const routes: Routes = [
  { path: '', component: LendingDashboardComponent },
  { path: 'applications/:id', component: LoanDetailComponent },
  { path: '**', redirectTo: '' }
];
