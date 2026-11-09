import { DecimalPipe } from '@angular/common';
import {Component,inject} from '@angular/core';
import {LogisticsDataService} from '../logistics-data.service';
@Component({standalone:true,imports: [DecimalPipe],template:`
<section class="page-head"><div><p class="eyebrow">FLEET MANAGEMENT</p><h1>Fleet directory</h1><p class="muted">Vehicle capacity, availability and current assignment.</p></div><span class="pill">{{data.vehicles().length}} vehicles</span></section><section class="fleet-grid">@for(v of data.vehicles();track v.id){<article class="panel vehicle"><div class="vehicle-icon">▰</div><div class="vehicle-head"><div><h2>{{v.registration}}</h2><small>{{v.type}}</small></div><span class="status">{{v.status}}</span></div><div class="facts"><div><small>Load capacity</small><strong>{{v.capacityKg|number}} kg</strong></div><div><small>Driver</small><strong>{{v.driver}}</strong></div><div><small>Last known depot</small><strong>{{v.location}}</strong></div></div></article>}</section>`})
export class FleetComponent{readonly data=inject(LogisticsDataService);}
