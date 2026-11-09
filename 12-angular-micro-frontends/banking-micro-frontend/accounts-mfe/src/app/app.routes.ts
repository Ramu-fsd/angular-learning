import { Routes } from '@angular/router';
import { AccountsDashboardComponent } from './accounts-dashboard.component';
import { AccountDetailComponent } from './account-detail.component';

export const routes: Routes = [
  { path: '', component: AccountsDashboardComponent },
  { path: ':id', component: AccountDetailComponent },
  { path: '**', redirectTo: '' }
];
