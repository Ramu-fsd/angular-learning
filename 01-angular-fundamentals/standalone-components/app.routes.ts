import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./banking-home.component').then((m) => m.BankingHomeComponent)
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('../dependency-injection/account-overview.component')
        .then((m) => m.AccountOverviewComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
