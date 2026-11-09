import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccountsService } from './accounts.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page"><a routerLink="/" class="back">← Back to account portfolio</a>
      @if (account(); as item) {
        <div class="heading"><div><p class="eyebrow">{{item.id}} · {{item.type}}</p><h1>{{item.customer}}</h1><p class="sub">{{item.accountNumber}} · {{item.branch}}</p></div><span class="state" [class]="item.status.toLowerCase()">{{item.status}}</span></div>
        <div class="balance-grid"><article><small>LEDGER BALANCE</small><strong>{{item.ledgerBalance | currency:item.currency:'symbol':'1.2-2'}}</strong></article><article><small>AVAILABLE BALANCE</small><strong>{{item.availableBalance | currency:item.currency:'symbol':'1.2-2'}}</strong></article><article><small>ACCOUNT OPENED</small><strong>{{item.openedOn | date:'mediumDate'}}</strong></article></div>
        <article class="panel"><div class="panel-head"><div><h2>Recent account activity</h2><p>Latest transactions recorded against this account.</p></div><span>{{item.transactions.length}} entries</span></div>
          @if (item.transactions.length > 0) {
            <div class="table-wrap"><table><thead><tr><th>TRANSACTION</th><th>DATE</th><th>CATEGORY</th><th>STATUS</th><th class="right">AMOUNT</th></tr></thead><tbody>
              @for (tx of item.transactions; track tx.id) {<tr><td><b>{{tx.description}}</b><small>{{tx.id}}</small></td><td>{{tx.date | date:'MMM d, y, h:mm a'}}</td><td>{{tx.category}}</td><td><span class="tx-status">{{tx.status}}</span></td><td class="right" [class.credit]="tx.direction === 'Credit'" [class.debit]="tx.direction === 'Debit'">{{tx.direction === 'Credit' ? '+' : '−'}}{{tx.amount | currency:item.currency:'symbol':'1.2-2'}}</td></tr>}
            </tbody></table></div>
          } @else {<div class="empty">No transaction activity is available for this account.</div>}
        </article>
        <div class="notice"><b>Account servicing note</b><span>This is a read-only portfolio demonstration. Account status and balances are not connected to a banking core system.</span></div>
      } @else {<article class="panel">Account not found. Return to the account portfolio and select a listed account.</article>}
    </section>
  `,
  styles: [`
    .page{max-width:1250px;margin:auto;padding:28px 30px}.back{font-size:10px;color:#2c70b6;text-decoration:none}.heading{display:flex;justify-content:space-between;align-items:center;margin:22px 0}.eyebrow{font-size:9px;color:#2c70b6;letter-spacing:1px;font-weight:700;margin:0 0 8px}h1{font-size:24px;color:#20334d;margin:0}.sub{font-size:10px;color:#8b98a8;margin:7px 0}.state{font-size:8px;padding:6px 9px;border-radius:5px;background:#f0f4f8;color:#64768e}.state.active{background:#e9f7ef;color:#32855b}.state.dormant{background:#fff4e5;color:#a87728}.state.blocked{background:#ffedeb;color:#bd5149}.balance-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px}.balance-grid article,.panel{background:#fff;border:1px solid #e7ecf2;border-radius:9px;padding:17px}.balance-grid small{display:block;font-size:8px;letter-spacing:1px;color:#8e9bab;font-weight:700}.balance-grid strong{display:block;font-size:19px;color:#253a55;margin-top:11px}.panel-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.panel h2{font-size:14px;color:#2c405a;margin:0}.panel-head p{font-size:10px;color:#8a97a7;margin:6px 0 0}.panel-head>span{font-size:9px;color:#8a97a7}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;min-width:680px}th{text-align:left;font-size:8px;letter-spacing:.8px;color:#8996a6;background:#fafbfd;padding:12px}td{font-size:10px;color:#6e7d91;padding:13px 12px;border-top:1px solid #edf0f4}td b,td small{display:block}td b{font-size:10px;color:#40536c}td small{font-size:8px;color:#a0aab6;margin-top:4px}.right{text-align:right}.credit{color:#278253;font-weight:700}.debit{color:#bd654f;font-weight:700}.tx-status{font-size:8px;background:#edf6f0;color:#3e875e;padding:5px 7px;border-radius:4px}.empty{text-align:center;padding:25px;color:#8a97a7;font-size:10px}.notice{display:flex;gap:10px;margin-top:14px;background:#fff8e9;border:1px solid #f1e6c9;padding:11px;border-radius:6px;font-size:9px;color:#8a7956;line-height:1.5}.notice b{color:#745c2c;white-space:nowrap}@media(max-width:650px){.page{padding:22px 15px}.heading{align-items:flex-start;flex-direction:column}.balance-grid{grid-template-columns:1fr}.notice{flex-direction:column}}
  `]
})
export class AccountDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly accounts = inject(AccountsService);
  readonly account = computed(() => this.accounts.getById(this.route.snapshot.paramMap.get('id') || ''));
}
