import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FraudDataService } from '../../core/fraud-data.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <div class="heading"><div><h1>Fraud alert queue</h1><p>Search, prioritize, and route suspicious activity for investigation.</p></div><span class="count">{{filtered().length}} alerts</span></div>
    <section class="filters"><input aria-label="Search alerts" placeholder="Search alert, transaction, merchant or customer" [value]="query()" (input)="query.set($any($event.target).value)"><select aria-label="Severity filter" [value]="severity()" (change)="severity.set($any($event.target).value)"><option value="ALL">All severities</option>@for(s of severities;track s){<option [value]="s">{{s}}</option>}</select><select aria-label="Status filter" [value]="status()" (change)="status.set($any($event.target).value)"><option value="ALL">All statuses</option>@for(s of statuses;track s){<option [value]="s">{{s}}</option>}</select></section>
    <section class="table-wrap"><table><thead><tr><th>ALERT / TRANSACTION</th><th>MERCHANT</th><th>RISK</th><th>AMOUNT</th><th>STATUS</th><th>ASSIGNED TO</th><th>CREATED</th><th></th></tr></thead><tbody>
      @for(a of filtered();track a.id){<tr><td><b>{{a.id}}</b><small>{{a.transactionId}} · {{a.customerRef}}</small></td><td>{{a.merchant}}</td><td><span class="risk" [class]="a.severity.toLowerCase()">{{a.riskScore}} · {{a.severity}}</span></td><td>{{a.amount|currency:a.currency}}</td><td><span class="status">{{a.status}}</span></td><td>{{a.assignedTo||'Unassigned'}}</td><td>{{a.createdAt|date:'short'}}</td><td><a [routerLink]="['/alerts',a.id]">Investigate →</a></td></tr>}
      @empty{<tr><td colspan="8" class="empty">No alerts match the selected filters.</td></tr>}
    </tbody></table></section>
  `,
  styles: [`
    .heading{display:flex;justify-content:space-between;align-items:center}.heading h1{font-size:25px;margin:0 0 6px}.heading p{font-size:12px;color:#7d899c;margin:0}.count{font-size:10px;color:#60718a;background:#e8edf6;padding:7px 10px;border-radius:20px}
    .filters{display:flex;gap:10px;margin:20px 0}.filters input{flex:1;min-width:160px}.filters input,.filters select{padding:10px;border:1px solid #dce2eb;border-radius:7px;background:#fff;font-size:11px}
    .table-wrap{overflow:auto;background:#fff;border:1px solid #e6eaf1;border-radius:10px}table{border-collapse:collapse;width:100%;text-align:left;font-size:10px;min-width:900px}th,td{padding:13px 11px;border-bottom:1px solid #edf0f5;white-space:nowrap}th{font-size:9px;color:#8190a4}td b,td small{display:block}td small{font-size:9px;color:#8591a3;margin-top:4px}td a{color:#315bb7;text-decoration:none;font-weight:600}.risk,.status{font-size:9px;padding:5px 7px;border-radius:20px;background:#f0f2f6}.risk.critical{background:#fde9e8;color:#a72f2a}.risk.high{background:#fff0df;color:#99520d}.risk.medium{background:#fff8d9;color:#806500}.risk.low{background:#e5f5ee;color:#24704f}.empty{text-align:center;color:#8290a3;padding:28px}
    @media(max-width:650px){.filters{flex-direction:column}.heading{align-items:flex-start;gap:12px;flex-direction:column}}
  `]
})
export class AlertQueueComponent {
  readonly data = inject(FraudDataService);
  readonly query = signal('');
  readonly severity = signal('ALL');
  readonly status = signal('ALL');
  readonly severities = ['LOW','MEDIUM','HIGH','CRITICAL'];
  readonly statuses = ['OPEN','INVESTIGATING','ESCALATED','CLOSED'];
  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    return this.data.alerts().filter(a =>
      (this.severity()==='ALL' || a.severity===this.severity()) &&
      (this.status()==='ALL' || a.status===this.status()) &&
      (!q || `${a.id} ${a.transactionId} ${a.customerRef} ${a.merchant}`.toLowerCase().includes(q))
    );
  });
}
