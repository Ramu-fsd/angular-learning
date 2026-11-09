import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LendingDataService } from '../../core/lending-data.service';

@Component({
 standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink],
 template:`
 <div class="heading"><div><span class="eyebrow">CREDIT OPERATIONS</span><h1>Loan origination pipeline</h1><p>Track applications, evidence review, and underwriting decisions.</p></div></div>
 <section class="metrics"><article><small>Active applications</small><b>{{data.activeCount()}}</b></article><article><small>Under review</small><b>{{data.reviewCount()}}</b></article><article><small>High-risk cases</small><b class="red">{{data.highRiskCount()}}</b></article><article><small>Active requested value</small><b>{{data.requestedValue()|currency:'USD':'symbol':'1.0-0'}}</b></article></section>
 <section class="filters"><input placeholder="Search application or applicant" aria-label="Search loan applications" [value]="query()" (input)="query.set($any($event.target).value)"><select aria-label="Filter status" [value]="status()" (change)="status.set($any($event.target).value)"><option value="ALL">All statuses</option>@for(s of statuses;track s){<option [value]="s">{{s.replaceAll('_',' ')}}</option>}</select></section>
 <section class="table"><table><thead><tr><th>APPLICATION</th><th>APPLICANT</th><th>PRODUCT</th><th>REQUESTED</th><th>TERM</th><th>RISK</th><th>STATUS</th><th>ASSIGNED</th><th></th></tr></thead><tbody>
 @for(a of filtered();track a.id){<tr><td><b>{{a.id}}</b><small>{{a.customerRef}}</small></td><td>{{a.applicant}}</td><td>{{a.product}}</td><td>{{a.requestedAmount|currency:a.currency}}</td><td>{{a.termMonths}} months</td><td><span class="risk" [class]="a.riskBand.toLowerCase()">{{a.riskBand}}</span></td><td>{{a.status.replaceAll('_',' ')}}</td><td>{{a.assignedTo||'Unassigned'}}</td><td><a [routerLink]="['/applications',a.id]">Review →</a></td></tr>}
 @empty{<tr><td colspan="9" class="empty">No applications match your filters.</td></tr>}
 </tbody></table></section>
 <p class="footnote">Portfolio data is synthetic. Risk bands and statuses are illustrative workflow values, not credit decisions.</p>
 `,
 styles:[`
 .heading h1{font-size:25px;margin:7px 0}.eyebrow{font-size:9px;color:#4268bd;font-weight:800;letter-spacing:1.3px}.heading p{font-size:12px;color:#8190a3;margin:0}
 .metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:20px 0}.metrics article{background:#fff;border:1px solid #e6eaf1;border-radius:9px;padding:15px}.metrics small{display:block;color:#8190a3;font-size:10px}.metrics b{display:block;font-size:22px;margin-top:9px}.red{color:#b83d37}
 .filters{display:flex;gap:10px;margin:15px 0}.filters input{flex:1}.filters input,.filters select{padding:10px;border:1px solid #dce2eb;border-radius:7px;background:#fff;font-size:11px}
 .table{overflow:auto;background:#fff;border:1px solid #e6eaf1;border-radius:10px}table{width:100%;min-width:1050px;border-collapse:collapse;text-align:left;font-size:10px}th,td{padding:13px 10px;border-bottom:1px solid #edf0f5;white-space:nowrap}th{font-size:9px;color:#8290a3}td b,td small{display:block}td small{font-size:9px;color:#8290a3;margin-top:4px}td a{color:#315bb7;text-decoration:none;font-weight:600}.risk{font-size:9px;padding:5px 7px;border-radius:20px;background:#f0f2f6}.risk.high{background:#fde9e8;color:#a72f2a}.risk.medium{background:#fff5dc;color:#94620c}.risk.low{background:#e5f5ee;color:#24704f}.empty{text-align:center;color:#8290a3;padding:24px}.footnote{font-size:10px;color:#8a96a8;margin-top:13px}
 @media(max-width:750px){.metrics{grid-template-columns:1fr 1fr}.filters{flex-direction:column}}
 `]
})
export class LendingDashboardComponent {
 readonly data=inject(LendingDataService);readonly query=signal('');readonly status=signal('ALL');
 readonly statuses=['SUBMITTED','IN_REVIEW','MORE_INFORMATION_REQUIRED','APPROVED','DECLINED'];
 readonly filtered=computed(()=>{const q=this.query().toLowerCase().trim();return this.data.applications().filter(a=>(this.status()==='ALL'||a.status===this.status())&&(!q||`${a.id} ${a.applicant} ${a.customerRef} ${a.product}`.toLowerCase().includes(q)));});
}
