import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard.component';
import {ShipmentsComponent} from './pages/shipments.component';
import {ShipmentDetailComponent} from './pages/shipment-detail.component';
import {FleetComponent} from './pages/fleet.component';
import {ExceptionsComponent} from './pages/exceptions.component';
export const routes:Routes=[
 {path:'',component:DashboardComponent},
 {path:'shipments',component:ShipmentsComponent},
 {path:'shipments/:id',component:ShipmentDetailComponent},
 {path:'fleet',component:FleetComponent},
 {path:'exceptions',component:ExceptionsComponent},
 {path:'**',redirectTo:''}
];
