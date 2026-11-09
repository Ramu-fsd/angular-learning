import { Component,inject } from '@angular/core';
import { CurrencyPipe,DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HealthcareDataService } from '../healthcare-data.service';
@Component({standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink],template:`
<section class="page-head"><div><p class="eyebrow">CARE OPERATIONS</p><h1>Good morning, Jordan</h1><p class="muted">Patient administration and clinic activity at a glance.</p></div><a class="primary" routerLink="/appointments">Manage appointments →</a></section>
<section class="stats"><article class="stat"><span class="ico blue">♙</span><small>Registered patients</small><strong>{{data.patients().length}}</strong><label>{{data.activePatients()}} active records</label></article><article class="stat"><span class="ico violet">◷</span><small>Open appointments</small><strong>{{data.upcomingAppointments()}}</strong><label>Scheduled or checked in</label></article><article class="stat"><span class="ico amber">▤</span><small>Billing work items</small><strong>{{data.billing().length}}</strong><label>Across payer accounts</label></article><article class="stat"><span class="ico green">✓</span><small>Completed visits</small><strong>{{completed}}</strong><label>In the sample schedule</label></article></section>
<section class="panel"><div class="panel-head"><div><h2>Today's appointments</h2><p class="muted">Clinic schedule and check-in status</p></div><a class="link" routerLink="/appointments">View schedule →</a></div><div class="table-wrap"><table><thead><tr><th>Time</th><th>Patient</th><th>Department</th><th>Clinician</th><th>Visit type</th><th>Status</th></tr></thead><tbody>@for(a of today;track a.id){<tr><td>{{a.time}}</td><td><a class="link" [routerLink]="['/patients',a.patientId]">{{a.patientName}}</a></td><td>{{a.department}}</td><td>{{a.clinician}}</td><td>{{a.type}}</td><td><span class="status">{{a.status}}</span></td></tr>}</tbody></table></div></section>
<section class="panel"><div class="panel-head"><div><h2>Recent billing activity</h2><p class="muted">Payer processing overview</p></div><a class="link" routerLink="/billing">Open billing →</a></div>@for(b of data.billing().slice(0,3);track b.id){<div class="billing-row"><div><strong>{{b.patientName}}</strong><small>{{b.service}} · {{b.payer}}</small></div><strong>{{b.amount|currency:'INR':'symbol':'1.0-0'}}</strong><span class="status">{{b.status}}</span></div>}</section>`})
export class DashboardComponent{
 readonly data=inject(HealthcareDataService);
 readonly today=this.data.appointments().filter(a=>a.date==='2026-11-09');
 get completed(){return this.data.appointments().filter(a=>a.status==='Completed').length;}
}
