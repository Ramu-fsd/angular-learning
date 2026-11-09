import {Component,inject,signal,computed} from '@angular/core';
import {CurrencyPipe,DatePipe} from '@angular/common';
import {HealthcareDataService} from '../healthcare-data.service';
@Component({standalone:true,imports:[CurrencyPipe,DatePipe],template:`
<section class="page-head"><div><p class="eyebrow">REVENUE CYCLE</p><h1>Billing & insurance claims</h1><p class="muted">Track submitted charges and payer processing status.</p></div><span class="pill">{{filtered().length}} items</span></section>
<section class="panel"><div class="filters"><input placeholder="Search patient, service or payer..." [value]="query()" (input)="query.set($any($event.target).value)"><select [value]="status()" (change)="status.set($any($event.target).value)"><option>All</option><option>Submitted</option><option>In Review</option><option>Approved</option><option>Denied</option><option>Paid</option></select></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Patient</th><th>Service</th><th>Date</th><th>Payer</th><th>Amount</th><th>Status</th></tr></thead><tbody>@for(b of filtered();track b.id){<tr><td>{{b.id}}</td><td>{{b.patientName}}</td><td>{{b.service}}</td><td>{{b.serviceDate|date:'dd MMM yyyy'}}</td><td>{{b.payer}}</td><td>{{b.amount|currency:'INR':'symbol':'1.0-0'}}</td><td><span class="status">{{b.status}}</span></td></tr>}@empty{<tr><td colspan="7" class="empty">No billing items match your filters.</td></tr>}</tbody></table></div></section>`})
export class BillingComponent{
 readonly data=inject(HealthcareDataService);readonly query=signal('');readonly status=signal('All');
 readonly filtered=computed(()=>{const q=this.query().toLowerCase();return this.data.billing().filter(b=>(this.status()==='All'||b.status===this.status())&&[b.patientName,b.service,b.payer,b.id].some(v=>v.toLowerCase().includes(q)));});
}
