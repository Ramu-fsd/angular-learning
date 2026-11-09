import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'accounts', loadComponent: () => import('./features/accounts/accounts.component').then(m => m.AccountsComponent) },
  { path: 'transactions', loadComponent: () => import('./features/transactions/transactions.component').then(m => m.TransactionsComponent) },
  { path: 'beneficiaries', loadComponent: () => import('./features/beneficiaries/beneficiaries.component').then(m => m.BeneficiariesComponent) },
  { path: 'service-requests', loadComponent: () => import('./features/service-requests/service-requests.component').then(m => m.ServiceRequestsComponent) },
  { path: '**', redirectTo: 'dashboard' }
];
