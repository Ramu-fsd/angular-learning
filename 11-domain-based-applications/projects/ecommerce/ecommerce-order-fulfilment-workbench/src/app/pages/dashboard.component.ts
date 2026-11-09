import {Component,inject} from '@angular/core';
import {CurrencyPipe,DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {StoreService} from '../store.service';
@Component({standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink],template:`
<section class="page-head"><div><p class="eyebrow">COMMERCE OPERATIONS</p><h1>Operations overview</h1><p class="muted">Monitor orders, fulfilment progress and customer returns.</p></div><a class="primary" routerLink="/catalog">Browse catalogue →</a></section>
<section class="stats"><article class="stat"><small>Total orders</small><strong>{{store.orders().length}}</strong><label>Across the sample workspace</label></article><article class="stat"><small>In fulfilment</small><strong>{{fulfilmentCount}}</strong><label>Processing or shipped</label></article><article class="stat"><small>Returns to review</small><strong>{{pendingReturns}}</strong><label>Awaiting a decision</label></article><article class="stat"><small>Order value</small><strong>{{orderValue|currency:'INR':'symbol':'1.0-0'}}</strong><label>Sample order book</label></article></section>
<section class="panel"><div class="panel-head"><div><h2>Recent orders</h2><p class="muted">Latest customer order activity</p></div><a class="link" routerLink="/orders">View all →</a></div><div class="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Placed</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>@for(o of store.orders().slice(0,5);track o.id){<tr><td><a class="link" [routerLink]="['/orders',o.id]">{{o.number}}</a></td><td>{{o.customer}}</td><td>{{o.placedAt|date:'dd MMM, HH:mm'}}</td><td>{{o.lines.length}}</td><td>{{o.total|currency:'INR':'symbol':'1.0-0'}}</td><td><span class="status">{{o.status}}</span></td></tr>}</tbody></table></div></section>
<section class="panel"><div class="panel-head"><div><h2>Returns requiring attention</h2><p class="muted">Customer return and refund requests</p></div><a class="link" routerLink="/returns">Open returns →</a></div>@for(r of store.returns().slice(0,3);track r.id){<div class="return-row"><div><strong>{{r.item}}</strong><small>{{r.orderNumber}} · {{r.customer}}</small></div><span class="status">{{r.status}}</span><b>{{r.refund|currency:'INR':'symbol':'1.0-0'}}</b></div>}</section>`})
export class DashboardComponent{
 readonly store=inject(StoreService);
 get fulfilmentCount(){return this.store.orders().filter(o=>['Processing','Shipped'].includes(o.status)).length;}
 get pendingReturns(){return this.store.returns().filter(r=>r.status==='Requested').length;}
 get orderValue(){return this.store.orders().reduce((s,o)=>s+o.total,0);}
}
