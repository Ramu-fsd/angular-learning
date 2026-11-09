import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BankingDataService } from '../../core/banking-data.service';

@Component({
  standalone:true, imports:[CurrencyPipe,DatePipe,RouterLink],
  template:`
  <section class="page">
    <div class="welcome"><div><span class="eyebrow">MONDAY, 9 NOVEMBER 2026</span><h1>Good morning, Jordan</h1><p>Here is your financial snapshot.</p></div><span class="secure">● Demo environment</span></div>
    <div class="balance-card"><span>Total relationship balance</span><strong>{{data.totalBalance() | currency:'USD'}}</strong><small>Across {{data.accounts().length}} accounts</small></div>
    <div class="section-title"><h2>Your accounts</h2><a routerLink="/accounts">View all accounts →</a></div>
    <div class="account-grid">@for(a of data.accounts();track a.accountId){<article class="account"><span>{{a.displayName}}</span><strong>{{a.availableBalance | currency:a.currency}}</strong><small>{{a.maskedNumber}} · {{a.accountType}}</small></article>}</div>
    <div class="section-title"><h2>Recent activity</h2><a routerLink="/transactions">View transactions →</a></div>
    <div class="activity">@for(t of data.transactions().slice(0,4);track t.transactionId){<div class="activity-row"><span class="activity-icon">↗</span><div class="activity-name"><b>{{t.description}}</b><small>{{t.date | date:'mediumDate'}} · {{t.category}}</small></div><strong [class.credit]="t.amount>0">{{t.amount>0?'+':''}}{{t.amount|currency:t.currency}}</strong></div>}</div>
  </section>`,
  styles:[`.page{padding:28px 30px;max-width:1200px}.welcome,.section-title{display:flex;justify-content:space-between;align-items:center;gap:12px}.eyebrow{font-size:9px;letter-spacing:1.2px;color:#8491a5;font-weight:700}h1{font-size:27px;margin:8px 0 4px}p{color:#7d899c;font-size:12px}.secure{font-size:10px;color:#36805e;background:#e8f5ee;padding:8px 10px;border-radius:20px}.balance-card{margin:24px 0 27px;padding:23px 25px;border-radius:12px;background:linear-gradient(115deg,#203b70,#315a9c);color:white;max-width:520px}.balance-card span,.balance-card small{display:block;color:#d1dcf0;font-size:11px}.balance-card strong{display:block;font-size:30px;margin:10px 0}.section-title{margin:22px 0 12px}.section-title h2{font-size:16px;margin:0}.section-title a{font-size:11px;color:#315bb7;text-decoration:none}.account-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.account,.activity{background:white;border:1px solid #e8ecf2;border-radius:10px}.account{padding:17px}.account span,.account small{display:block;color:#7d899c;font-size:10px}.account strong{display:block;font-size:18px;margin:12px 0}.activity{padding:0 17px}.activity-row{display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid #edf0f5}.activity-row:last-child{border:0}.activity-icon{width:31px;height:31px;display:grid;place-items:center;background:#edf2fc;border-radius:50%;color:#315bb7}.activity-name{flex:1}.activity-name b,.activity-name small{display:block}.activity-name b{font-size:11px}.activity-name small{font-size:9px;color:#8491a5;margin-top:4px}.activity-row>strong{font-size:12px}.credit{color:#19865c}@media(max-width:700px){.page{padding:22px 14px}.account-grid{grid-template-columns:1fr}.welcome{align-items:flex-start;flex-direction:column}}`]
})
export class DashboardComponent { readonly data = inject(BankingDataService); }
