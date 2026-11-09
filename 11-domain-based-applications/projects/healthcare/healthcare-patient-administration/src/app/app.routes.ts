import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { PatientsComponent } from './pages/patients.component';
import { PatientDetailComponent } from './pages/patient-detail.component';
import { AppointmentsComponent } from './pages/appointments.component';
import { BillingComponent } from './pages/billing.component';
export const routes:Routes=[
 {path:'',component:DashboardComponent},
 {path:'patients',component:PatientsComponent},
 {path:'patients/:id',component:PatientDetailComponent},
 {path:'appointments',component:AppointmentsComponent},
 {path:'billing',component:BillingComponent},
 {path:'**',redirectTo:''}
];
