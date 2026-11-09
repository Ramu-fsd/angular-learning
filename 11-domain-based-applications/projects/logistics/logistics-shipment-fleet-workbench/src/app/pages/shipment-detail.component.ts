import {Component,computed,inject,signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LogisticsDataService} from '../logistics-data.service';
import {ShipmentStatus,StopStatus} from '../models';
@Component({standalone:true,imports:[DatePipe,RouterLink,FormsModule],template:`
@if(shipment();as s){<a class="back" routerLink="/shipments">← Back to shipments</a><section class="page-head"><div><p class="eyebrow">SHIPMENT FILE · {{s.number}}</p><h1>{{s.customer}}</h1><p class="muted">{{s.origin}} → {{s.destination}} · <span class="status">{{s.status}}</span></p></div><span class="priority" [class]="s.priority.toLowerCase()">{{s.priority}} priority</span></section>
<section class="detail-grid"><article class="panel"><h2>Shipment details</h2><div class="facts"><div><small>Service</small><strong>{{s.service}}</strong></div><div><small>Load weight</small><strong>{{s.weight}} kg</strong></div><div><small>Created</small><strong>{{s.createdAt|date:'dd MMM yyyy, HH:mm'}}</strong></div><div><small>Estimated delivery</small><strong>{{s.eta|date:'dd MMM yyyy, HH:mm'}}</strong></div><div><small>Vehicle</small><strong>{{s.vehicleId||'Unassigned'}}</strong></div><div><small>Driver</small><strong>{{s.driver}}</strong></div></div><label class="field-label">Shipment status</label><select [ngModel]="s.status" (ngModelChange)="setStatus($event)"><option>Booked</option><option>Dispatched</option><option>In Transit</option><option>At Delivery Hub</option><option>Delivered</option><option>Delayed</option></select></article>
<article class="panel"><h2>Dispatch assignment</h2><p class="muted">Assign an available vehicle and driver.</p><label class="field-label">Available vehicle</label><select [ngModel]="vehicleId()" (ngModelChange)="vehicleId.set($event)"><option value="">Select vehicle</option>@for(v of availableVehicles;track v.id){<option [value]="v.id">{{v.registration}} · {{v.type}} · {{v.capacityKg}} kg</option>}</select><label class="field-label">Driver name</label><input [value]="driver()" (input)="driver.set($any($event.target).value)" placeholder="Enter assigned driver"><button class="primary full" (click)="assign()" [disabled]="!vehicleId()||!driver().trim()">Save assignment</button><div class="notice">Demo only: production dispatch must validate depot, capacity, driver duty hours, license and vehicle eligibility.</div></article></section>
<section class="panel"><h2>Route & stop progression</h2><p class="muted">Planned stops and operational completion.</p><div class="stops">@for(st of s.stops;track st.id){<div class="stop"><span class="stop-dot" [class.done]="st.status==='Completed'" [class.issue]="st.status==='Exception'"></span><div class="stop-main"><strong>{{st.name}}</strong><small>{{st.kind}} · {{st.city}} · Planned {{st.plannedTime}}</small><small>Actual: {{st.actualTime}}</small></div><select [ngModel]="st.status" (ngModelChange)="updateStop(st.id,$event)"><option>Pending</option><option>Arrived</option><option>Completed</option><option>Exception</option></select></div>}</div></section>
@if(s.exceptions.length){<section class="panel"><h2>Active exceptions</h2>@for(e of s.exceptions;track e){<div class="exception-row"><span class="alert">!</span><strong>{{e}}</strong></div>}</section>}
}@else{<section class="panel"><h2>Shipment not found</h2><a routerLink="/shipments">Return to queue</a></section>}`})
export class ShipmentDetailComponent{
 private route=inject(ActivatedRoute);readonly data=inject(LogisticsDataService);
 readonly shipment=computed(()=>this.data.shipments().find(s=>s.id===this.route.snapshot.paramMap.get('id')));
 readonly vehicleId=signal('');readonly driver=signal('');
 get availableVehicles(){const s=this.shipment();return this.data.vehicles().filter(v=>v.status==='Available'||v.id===s?.vehicleId);}
 assign(){const s=this.shipment();const v=this.data.vehicles().find(x=>x.id===this.vehicleId());if(s&&v&&this.driver().trim()&&v.capacityKg>=s.weight)this.data.assign(s.id,v.id,this.driver().trim());}
 setStatus(status:ShipmentStatus){const s=this.shipment();if(s)this.data.updateStatus(s.id,status);}
 updateStop(id:string,status:StopStatus){const s=this.shipment();if(s)this.data.updateStop(s.id,id,status);}
}
