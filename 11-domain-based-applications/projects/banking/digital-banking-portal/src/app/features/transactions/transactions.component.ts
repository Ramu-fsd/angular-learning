import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BankingDataService } from '../../core/banking-data.service';
@Component({standalone:true,imports:[CurrencyPipe,DatePipe],template:`
<section class="page"><h1>Transactions</h1><p>Search and review recent account activity.</p>
<div class="filters"><input aria-label="Search transactions" placeholder="Search description or category" [value]="query()" (input)="query.set($any($event.target).value)"><select aria-label="Filter category" [value]="category()" (change)="category.set($any($event.target).value)"><option value="ALL">All categories</option>@for(c of categories();track c){<option [value]="c">{{c}}</option>}</select></div>
<div class="table"><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Status</th><th>Amount</th></tr></thead><tbody>@for(t of filtered();track t.transactionId){<tr><td>{{t.date|date:'mediumDate'}}</td><td>{{t.description}}</td><td>{{t.category}}</td><td>{{t.status}}</td><td [class.credit]="t.amount>0">{{t.amount>0?'+':''}}{{t.amount|currency:t.currency}}</td></tr>}@empty{<tr><td colspan="5">No matching transactions.</td></tr>}</tbody></table></div></section>`,
styles:[`.page{padding:30px}h1{font-size:25px}p{color:#7d899c;font-size:12px}.filters{display:flex;gap:10px;margin:20px 0}.filters input,.filters select{padding:10px;border:1px solid #dce2eb;border-radius:7px;background:white}.filters input{min-width:250px}.table{overflow:auto;background:white;border:1px solid #e7ebf2;border-radius:10px}table{width:100%;border-collapse:collapse;text-align:left;font-size:11px}th,td{padding:14px;border-bottom:1px solid #edf0f5;white-space:nowrap}th{color:#7d899c;font-size:10px}.credit{color:#19865c}@media(max-width:600px){.page{padding:22px 14px}.filters{flex-direction:column}.filters input{min-width:0}}`]
})
export class TransactionsComponent {
 readonly data=inject(BankingDataService);
 readonly query=signal('');
 readonly category=signal('ALL');
 readonly categories=computed(()=>[...new Set(this.data.transactions().map(t=>t.category))].sort());
 readonly filtered=computed(()=>this.data.transactions().filter(t=>{
  const q=this.query().trim().toLowerCase();
  return (!q||`${t.description} ${t.category} ${t.transactionId}`.toLowerCase().includes(q))&&(this.category()==='ALL'||t.category===this.category());
 }));
}
