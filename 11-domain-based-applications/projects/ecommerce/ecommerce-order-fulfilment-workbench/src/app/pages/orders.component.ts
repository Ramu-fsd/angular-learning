import {Component,computed,inject,signal} from '@angular/core';
import {CurrencyPipe,DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {StoreService} from '../store.service';
@Component({standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink],template:`
<section class="page-head"><div><p class="eyebrow">ORDER MANAGEMENT</p><h1>Orders</h1><p class="muted">Track customer orders through confirmation and delivery.</p></div><span class="pill">{{filtered().length}} orders</span></section><section class="panel"><div class="filters"><input placeholder="Search order number or customer..." [value]="query()" (input)="query.set($any($event.target).value)"><select [value]="status()" (change)="status.set($any($event.target).value)"><option>All statuses</option><option>Placed</option><option>Confirmed</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></div><div class="table-wrap"><table><thead><tr><th>Order number</th><th>Customer</th><th>Placed</th><th>Items</th><th>Payment</th><th>Total</th><th>Status</th></tr></thead><tbody>@for(o of filtered();track o.id){<tr><td><a class="link" [routerLink]="['/orders',o.id]">{{o.number}}</a></td><td>{{o.customer}}</td><td>{{o.placedAt|date:'dd MMM yyyy, HH:mm'}}</td><td>{{o.lines.length}}</td><td>{{o.paymentStatus}}</td><td>{{o.total|currency:'INR':'symbol':'1.0-0'}}</td><td><span class="status">{{o.status}}</span></td></tr>}@empty{<tr><td colspan="7" class="empty">No orders found.</td></tr>}</tbody></table></div></section>`})
export class OrdersComponent{
 readonly store=inject(StoreService);readonly query=signal('');readonly status=signal('All statuses');
 readonly filtered=computed(()=>{const q=this.query().toLowerCase();return this.store.orders().filter(o=>(this.status()==='All statuses'||o.status===this.status())&&[o.number,o.customer].some(v=>v.toLowerCase().includes(q)));});
}
