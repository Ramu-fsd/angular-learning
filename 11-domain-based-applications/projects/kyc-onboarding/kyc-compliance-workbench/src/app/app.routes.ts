import { Routes } from '@angular/router';
import { KycQueueComponent } from './features/queue/kyc-queue.component';
import { ApplicationDetailComponent } from './features/detail/application-detail.component';
export const routes: Routes = [{path:'',component:KycQueueComponent},{path:'applications/:id',component:ApplicationDetailComponent},{path:'**',redirectTo:''}];
