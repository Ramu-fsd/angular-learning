import { Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { PlaceholderComponent } from './placeholder.component';

export const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'accounts', component: PlaceholderComponent, data: { title: 'Accounts', description: 'The independently deployed Accounts remote will be connected in Project 2.' } },
  { path: 'payments', component: PlaceholderComponent, data: { title: 'Payments', description: 'The independently deployed Payments remote will be connected in Project 3.' } },
  { path: 'customers', component: PlaceholderComponent, data: { title: 'Customer management', description: 'The Customer Management remote will be introduced in a later project.' } },
  { path: 'admin', component: PlaceholderComponent, data: { title: 'Administration', description: 'The Admin Portal remote will be introduced in a later project.' } },
  { path: '**', redirectTo: '' }
];
