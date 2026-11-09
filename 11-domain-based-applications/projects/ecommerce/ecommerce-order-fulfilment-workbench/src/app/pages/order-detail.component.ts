import {Component,computed,inject} from '@angular/core';
import {CurrencyPipe,DatePipe} from '@angular/common';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {StoreService} from '../store.service';
import {OrderStatus} from '../models';
@Component({standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink,FormsModule],template:`
@if(order();as o){<a class="back" routerLink="/orders">← Back to orders</a><section class="page-head"><div><p class="eyebrow">ORDER DETAIL · {{o.number}}</p><h1>{{o.customer}}</h1><p class="muted">Placed {{o.placedAt|date:'dd MMM yyyy, HH:mm'}} · <span class="status">{{o.status}}</span></p></div><span class="pill">{{o.lines.length}} line items</span></section>
<section class="detail-grid"><article class="panel"><h2>Items ordered</h2>@for(line of o.lines;track line.productId){<div class="order-line"><div><strong>{{line.name}}</strong><small>{{line.sku}} · Qty {{line.quantity}}</small></div><b>{{line.unitPrice*line.quantity|currency:'INR':'symbol':'1.0-0'}}</b></div>}<div class="summary-line total"><span>Order total</span><b>{{o.total|currency:'INR':'symbol':'1.0-0'}}</b></div></article>
<article class="panel"><h2>Fulfilment controls</h2><label class="field-label">Order status</label><select [ngModel]="o.status" (ngModelChange)="update($event)"><option>Placed</option><option>Confirmed</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select><div class="facts"><div><small>Payment</small><strong>{{o.paymentStatus}}</strong></div><div><small>Carrier</small><strong>{{o.carrier}}</strong></div><div><small>Tracking number</small><strong>{{o.trackingNumber}}</strong></div><div><small>Ship to</small><strong>{{o.shippingAddress}}</strong></div></div><div class="notice">Status changes are local demo actions. Production fulfilment transitions must be validated by order and warehouse services.</div></article></section>
<section class="panel"><h2>Fulfilment timeline</h2><div class="timeline">@for(t of o.timeline;track t.label){<div class="timeline-item"><span class="timeline-dot" [class.done]="t.done"></span><div><strong>{{t.label}}</strong><small>{{t.date}}</small></div></div>}</div></section>
}@else{<section class="panel"><h2>Order not found</h2><a routerLink="/orders">Return to orders</a></section>}`})
export class OrderDetailComponent{
 private route=inject(ActivatedRoute);readonly store=inject(StoreService);
 readonly order=computed(()=>this.store.orders().find(o=>o.id===this.route.snapshot.paramMap.get('id')));
 update(status:OrderStatus){const o=this.order();if(o)this.store.updateOrderStatus(o.id,status);}
}
