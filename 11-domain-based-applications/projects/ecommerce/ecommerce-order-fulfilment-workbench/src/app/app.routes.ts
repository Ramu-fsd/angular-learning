import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard.component';
import {CatalogComponent} from './pages/catalog.component';
import {CartComponent} from './pages/cart.component';
import {OrdersComponent} from './pages/orders.component';
import {OrderDetailComponent} from './pages/order-detail.component';
import {ReturnsComponent} from './pages/returns.component';
export const routes:Routes=[
 {path:'',component:DashboardComponent},
 {path:'catalog',component:CatalogComponent},
 {path:'cart',component:CartComponent},
 {path:'orders',component:OrdersComponent},
 {path:'orders/:id',component:OrderDetailComponent},
 {path:'returns',component:ReturnsComponent},
 {path:'**',redirectTo:''}
];
