import {Component,inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {HealthcareDataService} from '../healthcare-data.service';
@Component({standalone:true,imports:[DatePipe,RouterLink],template:`
@if(patient;as p){<a class="back" routerLink="/patients">← Back to patients</a><section class="page-head"><div><p class="eyebrow">PATIENT PROFILE · {{p.mrn}}</p><h1>{{p.name}}</h1><p class="muted">{{p.gender}} · Born {{p.dob|date:'dd MMM yyyy'}} · <span class="status">{{p.status}}</span></p></div><a class="secondary" routerLink="/appointments">Appointments</a></section>
<section class="detail-grid"><article class="panel"><h2>Patient information</h2><div class="facts"><div><small>Medical record number</small><strong>{{p.mrn}}</strong></div><div><small>Blood group</small><strong>{{p.bloodGroup}}</strong></div><div><small>Phone</small><strong>{{p.phone}}</strong></div><div><small>Email</small><strong>{{p.email}}</strong></div></div></article><article class="panel"><h2>Allergy flags</h2>@if(p.allergies.length){@for(a of p.allergies;track a){<span class="allergy">{{a}}</span>}}@else{<p class="muted">No allergy flags in this synthetic record.</p>}<div class="notice">This demo is not a clinical source of truth. Verify allergies in the authorized clinical record before care.</div></article></section>
<section class="panel"><h2>Appointment history</h2>@for(a of appointments;track a.id){<div class="history"><div><strong>{{a.department}} · {{a.type}}</strong><small>{{a.date|date:'dd MMM yyyy'}} at {{a.time}} · {{a.clinician}}</small></div><span class="status">{{a.status}}</span></div>}@empty{<p class="muted">No appointment records.</p>}</section>
<section class="panel"><h2>Encounter summaries</h2>@for(e of encounters;track e.id){<div class="history"><div><strong>{{e.department}} · {{e.clinician}}</strong><small>{{e.date|date:'dd MMM yyyy'}}</small><p>{{e.summary}}</p></div></div>}@empty{<p class="muted">No encounter summaries.</p>}</section>
}@else{<section class="panel"><h2>Patient not found</h2><a routerLink="/patients">Return to directory</a></section>}`})
export class PatientDetailComponent{
 private route=inject(ActivatedRoute);readonly data=inject(HealthcareDataService);
 readonly patient=this.data.patients().find(p=>p.id===this.route.snapshot.paramMap.get('id'));
 get appointments(){return this.data.appointments().filter(a=>a.patientId===this.patient?.id);}
 get encounters(){return this.data.encounters().filter(e=>e.patientId===this.patient?.id);}
}
