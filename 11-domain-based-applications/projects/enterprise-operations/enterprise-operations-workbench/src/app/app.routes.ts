import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WorkQueueComponent } from './work-queue.component';
import { WorkDetailComponent } from './work-detail.component';
import { CreateWorkComponent } from './create-work.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'work', component: WorkQueueComponent },
  { path: 'work/new', component: CreateWorkComponent },
  { path: 'work/:id', component: WorkDetailComponent },
  { path: '**', redirectTo: '' }
];
