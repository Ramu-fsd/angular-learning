import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaymentsService } from './payments.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page">
      <div class="heading"><div><p class="eyebrow">BANKING DOMAIN / PAYMENT OPERATIONS</p><h1>Payments workbench</h1><p class="sub">Monitor payment processing, approvals, and exceptions.</p></div><a routerLink="/new" class="primary">＋ Initiate payment</a></div>
      <div class="metrics"><article><small>TOTAL PAYMENTS</small><strong>{{payments.totalCount()}}</strong><em>In this demonstration</em></article><article><small>PENDING APPROVAL</small><strong>{{payments.pendingCount()}}</strong><em>Awaiting checker action</em></article><article><small>COMPLETED</small><strong>{{payments.completedCount()}}</strong><em>Successful payments</em></article><article><small>FAILED / REJECTED</small><strong>{{payments.failedCount()}}</strong><em>Requires review</em></article></div>
      <div class="section-head"><div><h2>Payment queue</h2><p>Search and filter payment instructions.</p></div><span>{{filtered().length}} results</span></div>
      <div class="filters"><input placeholder="Search payment ID, beneficiary, reference..." [value]="query()" (input)="query.set($any($event.target).value)"><select [value]="status()" (change)="status.set($any($event.target).value)"><option>All statuses</option><option>Pending Approval</option><option>Processing</option><option>Completed</option><option>Rejected</option><option>Failed</option></select><select [value]="priority()" (change)="priority.set($any($event.target).value)"><option>All priorities</option><option>Urgent</option><option>High</option><option>Normal</option></select></div>
      <div class="queue">
        @for (payment of filtered(); track payment.id) {
          <a class="payment" [routerLink]="['/',payment.id]"><div class="payment-main"><div class="id">{{payment.id}} <span class="priority" [class]="payment.priority.toLowerCase()">{{payment.priority}}</span></div><h3>{{payment.beneficiary}}</h3><p>{{payment.debtor}} · {{payment.channel}}</p><small>{{payment.reference}}</small></div><div class="payment-side"><strong>{{payment.amount | currency:payment.currency:'symbol':'1.2-2'}}</strong><span class="status" [class]="statusClass(payment.status)">{{payment.status}}</span><small>{{payment.createdAt | date:'MMM d, h:mm a'}}</small><b>Details →</b></div></a>
        } @empty {<div class="empty">No payments match the selected filters.</div>}
      </div>
      <div class="disclaimer">Synthetic payment instructions only. No payment is sent to a bank or payment network.</div>
    </section>
  `,
  styles: [`
    .page{max-width:1250px;margin:auto;padding:30px}.heading,.section-head{display:flex;justify-content:space-between;align-items:center;gap:12px}.eyebrow{font-size:9px;letter-spacing:1.4px;color:#8293a7;font-weight:700;margin:0 0 8px}h1{font-size:25px;color:#20334d;margin:0}.sub,.section-head p{font-size:11px;color:#8996a7;margin:8px 0 0}.primary{background:#6557b3;color:#fff;text-decoration:none;padding:10px 13px;border-radius:6px;font-size:10px;font-weight:700}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:25px 0 30px}.metrics article{background:#fff;border:1px solid #e7ecf2;border-radius:9px;padding:15px}.metrics small{display:block;font-size:8px;letter-spacing:1px;color:#8b98a8;font-weight:700}.metrics strong{display:block;font-size:23px;color:#243951;margin:9px 0 3px}.metrics em{font-size:9px;color:#9aa5b2;font-style:normal}.section-head{margin-bottom:13px}.section-head h2{font-size:15px;color:#2b3e57;margin:0}.section-head>span{font-size:9px;color:#8a97a8}.filters{display:flex;gap:9px;margin-bottom:13px}.filters input,.filters select{border:1px solid #dfe6ee;background:#fff;padding:10px;border-radius:6px;font-size:10px;color:#53657d}.filters input{flex:1;min-width:180px}.queue{display:grid;gap:9px}.payment{display:flex;justify-content:space-between;gap:15px;background:#fff;border:1px solid #e7ecf2;border-radius:8px;padding:15px 17px;text-decoration:none;color:inherit}.payment:hover{border-color:#b7b0df}.id{font-size:9px;color:#6658ad;font-weight:700}.priority{margin-left:7px;padding:4px 6px;border-radius:4px;background:#f1f3f6;color:#65748a;font-size:8px}.priority.urgent{background:#ffedeb;color:#bd5149}.priority.high{background:#fff3e3;color:#ad7626}.payment h3{font-size:13px;color:#2b3f59;margin:8px 0 4px}.payment-main p{font-size:9px;color:#8794a5;margin:0 0 7px}.payment-main>small{font-size:8px;color:#a1acb8}.payment-side{display:flex;flex-direction:column;align-items:flex-end;gap:7px;min-width:175px}.payment-side strong{font-size:14px;color:#243951}.status{font-size:8px;padding:5px 7px;border-radius:4px;background:#f1f3f6;color:#63748a}.status.pending-approval{background:#fff3df;color:#a87927}.status.processing{background:#eaf2ff;color:#3972b4}.status.completed{background:#e8f7ef;color:#32845a}.status.rejected,.status.failed{background:#ffedeb;color:#bd5149}.payment-side small{font-size:8px;color:#99a5b2}.payment-side b{font-size:9px;color:#6658ad}.empty{padding:30px;text-align:center;background:#fff;border:1px solid #e7ecf2;border-radius:8px;color:#8996a7;font-size:11px}.disclaimer{font-size:9px;color:#9aa5b2;margin-top:13px}@media(max-width:850px){.metrics{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.page{padding:22px 15px}.heading{align-items:flex-start;flex-direction:column}.filters{flex-wrap:wrap}.filters input{flex-basis:100%}.payment{flex-direction:column}.payment-side{align-items:flex-start;min-width:0}}
  `]
})
export class PaymentsDashboardComponent {
  readonly payments = inject(PaymentsService);
  readonly query = signal('');
  readonly status = signal('All statuses');
  readonly priority = signal('All priorities');
  readonly filtered = computed(() => {
    const term = this.query().trim().toLowerCase();
    return this.payments.payments().filter((p) => {
      const matchesText = [p.id, p.reference, p.beneficiary, p.debtor].join(' ').toLowerCase().includes(term);
      return matchesText && (this.status() === 'All statuses' || p.status === this.status())
        && (this.priority() === 'All priorities' || p.priority === this.priority());
    });
  });
  statusClass(value: string): string { return value.toLowerCase().replaceAll(' ', '-'); }
}
