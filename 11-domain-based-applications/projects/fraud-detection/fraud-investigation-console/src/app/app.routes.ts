import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AlertQueueComponent } from './features/alerts/alert-queue.component';
import { InvestigationComponent } from './features/investigation/investigation.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'alerts', component: AlertQueueComponent },
  { path: 'alerts/:id', component: InvestigationComponent },
  { path: '**', redirectTo: '' }
];
