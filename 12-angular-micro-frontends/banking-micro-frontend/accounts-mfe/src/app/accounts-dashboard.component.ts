import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountsService } from './accounts.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page">
      <div class="heading"><div><p class="eyebrow">BANKING DOMAIN / ACCOUNT SERVICES</p><h1>Account portfolio</h1><p class="sub">View account relationships, balances, and servicing information.</p></div><span class="snapshot">DEMO DATA · 10 NOV 2026</span></div>
      <div class="metrics">
        <article><small>TOTAL ACCOUNTS</small><strong>{{accounts.totalAccounts()}}</strong><em>Across all account types</em></article>
        <article><small>ACTIVE ACCOUNTS</small><strong>{{accounts.activeAccounts()}}</strong><em>Eligible for servicing</em></article>
        <article><small>PORTFOLIO LEDGER BALANCE</small><strong>{{accounts.totalBalance() | currency:'INR':'symbol':'1.0-0'}}</strong><em>Aggregate synthetic balance</em></article>
      </div>
      <div class="section-head"><div><h2>Accounts</h2><p>Search and select an account to view its details.</p></div><span>{{filtered().length}} results</span></div>
      <div class="filters"><input placeholder="Search customer, account number, branch..." [value]="query()" (input)="query.set($any($event.target).value)"><select [value]="type()" (change)="type.set($any($event.target).value)"><option>All</option><option>Current</option><option>Savings</option><option>Fixed Deposit</option></select><select [value]="status()" (change)="status.set($any($event.target).value)"><option>All</option><option>Active</option><option>Dormant</option><option>Blocked</option></select></div>
      <div class="account-grid">
        @for (account of filtered(); track account.id) {
          <a class="account-card" [routerLink]="['/',account.id]"><div class="card-top"><span class="type">{{account.type}}</span><span class="state" [class]="account.status.toLowerCase()">{{account.status}}</span></div><h3>{{account.customer}}</h3><div class="number">{{account.accountNumber}} <span>{{account.id}}</span></div><div class="balance-label">LEDGER BALANCE</div><div class="balance">{{account.ledgerBalance | currency:account.currency:'symbol':'1.0-0'}}</div><div class="card-bottom"><span>{{account.branch}}</span><b>View account →</b></div></a>
        } @empty { <div class="empty">No accounts match the selected search and filters.</div> }
      </div>
      <div class="disclaimer">Portfolio values and customer identities are synthetic examples created for this learning project.</div>
    </section>
  `,
  styles: [`
    .page{max-width:1250px;margin:auto;padding:30px 30px}.heading,.section-head{display:flex;justify-content:space-between;align-items:center;gap:12px}.eyebrow{font-size:9px;letter-spacing:1.4px;color:#8293a7;font-weight:700;margin:0 0 8px}h1{font-size:25px;color:#20334d;margin:0;letter-spacing:-.5px}.sub,.section-head p{font-size:11px;color:#8996a7;margin:8px 0 0}.snapshot{font-size:8px;letter-spacing:.8px;color:#6b87a6;background:#edf4fb;padding:7px 9px;border-radius:5px}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin:25px 0 31px}.metrics article{background:#fff;border:1px solid #e7ecf2;border-radius:9px;padding:16px}.metrics small{display:block;font-size:8px;letter-spacing:1px;color:#8b98a8;font-weight:700}.metrics strong{display:block;font-size:23px;color:#243951;margin:10px 0 4px}.metrics em{font-size:9px;color:#9aa5b2;font-style:normal}.section-head{margin-bottom:13px}.section-head h2{font-size:15px;color:#2b3e57;margin:0}.section-head>span{font-size:9px;color:#8a97a8}.filters{display:flex;gap:9px;margin-bottom:15px}.filters input,.filters select{border:1px solid #dfe6ee;background:#fff;padding:10px;border-radius:6px;font-size:10px;color:#53657d}.filters input{flex:1;min-width:180px}.account-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.account-card{background:#fff;border:1px solid #e6ebf1;border-radius:9px;padding:17px;text-decoration:none;color:inherit}.account-card:hover{border-color:#9dbde0;box-shadow:0 4px 14px #193c630d}.card-top{display:flex;justify-content:space-between}.type,.state{font-size:8px;padding:5px 7px;border-radius:4px;background:#f0f4f8;color:#64768e}.state.active{background:#e9f7ef;color:#32855b}.state.dormant{background:#fff4e5;color:#a87728}.state.blocked{background:#ffedeb;color:#bd5149}.account-card h3{font-size:14px;color:#2c405a;margin:14px 0 5px}.number{font-size:10px;color:#7e8da0}.number span{margin-left:7px;color:#a2acb8}.balance-label{font-size:8px;letter-spacing:1px;color:#99a4b1;margin-top:20px}.balance{font-size:22px;color:#1f3855;font-weight:700;margin-top:5px}.card-bottom{border-top:1px solid #eef1f5;margin-top:16px;padding-top:12px;display:flex;justify-content:space-between;gap:8px;font-size:9px;color:#8996a6}.card-bottom b{color:#2c70b6;white-space:nowrap}.empty{grid-column:1/-1;background:#fff;padding:35px;text-align:center;border:1px solid #e7ecf2;border-radius:8px;color:#8996a7;font-size:11px}.disclaimer{margin-top:15px;font-size:9px;color:#9aa5b2}@media(max-width:700px){.page{padding:22px 15px}.heading{align-items:flex-start;flex-direction:column}.metrics{grid-template-columns:1fr}.account-grid{grid-template-columns:1fr}.filters{flex-wrap:wrap}.filters input{flex-basis:100%}}
  `]
})
export class AccountsDashboardComponent {
  readonly accounts = inject(AccountsService);
  readonly query = signal('');
  readonly type = signal('All');
  readonly status = signal('All');
  readonly filtered = computed(() => this.accounts.search(this.query(), this.type(), this.status()));
}
