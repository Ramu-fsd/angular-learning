import {Component,computed,inject,signal} from '@angular/core';
import {CurrencyPipe,DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PaymentDataService} from '../../core/payment-data.service';
@Component({standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink],template:`
<section class="page"><div class="head"><div><h1>Payment queue</h1><p>Search and review payment instructions.</p></div><a class="primary" routerLink="/payments/new">+ Create payment</a></div>
<div class="filters"><input placeholder="Search payment, beneficiary or reference" aria-label="Search payments" [value]="query()" (input)="query.set($any($event.target).value)"><select aria-label="Filter status" [value]="status()" (change)="status.set($any($event.target).value)"><option value="ALL">All statuses</option>@for(s of statuses;track s){<option [value]="s">{{s.replace('_',' ')}}</option>}</select></div>
<div class="table"><table><thead><tr><th>PAYMENT</th><th>BENEFICIARY</th><th>SUBMITTED BY</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th><th></th></tr></thead><tbody>
@for(p of filtered();track p.id){<tr><td><b>{{p.id}}</b><small>{{p.reference}}</small></td><td>{{p.beneficiary}}<small>{{p.beneficiaryAccountMasked}}</small></td><td>{{p.submittedBy}}</td><td>{{p.createdAt|date:'mediumDate'}}</td><td>{{p.amount|currency:p.currency}}</td><td><span class="pill">{{p.status.replace('_',' ')}}</span></td><td><a [routerLink]="['/payments',p.id]">Review</a></td></tr>}
@empty{<tr><td colspan="7" class="empty">No matching payments.</td></tr>}
</tbody></table></div></section>`,
styles:[`.page{padding:28px}.head,.filters{display:flex;align-items:center;justify-content:space-between;gap:12px}.head h1{font-size:25px;margin:0}.head p{font-size:12px;color:#7d899c}.primary{background:#315bb7;color:white;padding:10px 13px;border-radius:6px;text-decoration:none;font-size:11px}.filters{justify-content:flex-start;margin:18px 0}.filters input,.filters select{padding:10px;border:1px solid #dce2eb;border-radius:7px;background:white}.filters input{width:min(420px,70%)}.table{overflow:auto;background:white;border:1px solid #e7ebf2;border-radius:10px}table{width:100%;border-collapse:collapse;text-align:left;font-size:10px}th,td{padding:13px 10px;border-bottom:1px solid #edf0f5;white-space:nowrap}th{color:#8290a3;font-size:9px}td b,td small{display:block}td small{font-size:9px;color:#8290a3;margin-top:4px}.pill{background:#eff3fa;padding:5px 7px;border-radius:20px;font-size:9px}td a{color:#315bb7;text-decoration:none}.empty{text-align:center;color:#8290a3}@media(max-width:650px){.page{padding:20px 13px}.head{align-items:flex-start;flex-direction:column}.filters{align-items:stretch;flex-direction:column}.filters input{width:100%}}`]})
export class PaymentsComponent{
 readonly data=inject(PaymentDataService);readonly query=signal('');readonly status=signal('ALL');
 readonly statuses=['PENDING_APPROVAL','APPROVED','PROCESSING','COMPLETED','REJECTED','FAILED'];
 readonly filtered=computed(()=>{const q=this.query().toLowerCase().trim();return this.data.payments().filter(p=>(this.status()==='ALL'||p.status===this.status())&&(!q||`${p.id} ${p.beneficiary} ${p.reference} ${p.submittedBy}`.toLowerCase().includes(q)));});
}
