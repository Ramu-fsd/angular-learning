import {Component,computed,inject,signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HealthcareDataService} from '../healthcare-data.service';
@Component({standalone:true,imports:[DatePipe,RouterLink],template:`
<section class="page-head"><div><p class="eyebrow">PATIENT DIRECTORY</p><h1>Patients</h1><p class="muted">Find patient records and open their administration profile.</p></div><span class="pill">{{filtered().length}} records</span></section>
<section class="panel"><div class="filters"><input placeholder="Search name or medical record number..." [value]="query()" (input)="query.set($any($event.target).value)"><select [value]="status()" (change)="status.set($any($event.target).value)"><option>All</option><option>Active</option><option>Inactive</option></select></div><div class="table-wrap"><table><thead><tr><th>Patient</th><th>MRN</th><th>Date of birth</th><th>Gender</th><th>Phone</th><th>Status</th><th></th></tr></thead><tbody>@for(p of filtered();track p.id){<tr><td><strong>{{p.name}}</strong></td><td>{{p.mrn}}</td><td>{{p.dob|date:'dd MMM yyyy'}}</td><td>{{p.gender}}</td><td>{{p.phone}}</td><td><span class="status">{{p.status}}</span></td><td><a class="link" [routerLink]="['/patients',p.id]">Open →</a></td></tr>}@empty{<tr><td colspan="7" class="empty">No patient records found.</td></tr>}</tbody></table></div></section>`})
export class PatientsComponent{
 readonly data=inject(HealthcareDataService);readonly query=signal('');readonly status=signal('All');
 readonly filtered=computed(()=>{const q=this.query().toLowerCase();return this.data.patients().filter(p=>(this.status()==='All'||p.status===this.status())&&[p.name,p.mrn].some(v=>v.toLowerCase().includes(q)));});
}
