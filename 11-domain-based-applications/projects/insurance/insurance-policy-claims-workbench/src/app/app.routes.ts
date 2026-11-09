import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { PoliciesComponent } from './pages/policies.component';
import { PolicyDetailComponent } from './pages/policy-detail.component';
import { ClaimsComponent } from './pages/claims.component';
import { ClaimDetailComponent } from './pages/claim-detail.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'policies/:id', component: PolicyDetailComponent },
  { path: 'claims', component: ClaimsComponent },
  { path: 'claims/:id', component: ClaimDetailComponent },
  { path: '**', redirectTo: '' }
];
