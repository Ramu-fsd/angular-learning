import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InsuranceDataService } from '../insurance-data.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page-head"><div><p class="eyebrow">CLAIMS MANAGEMENT</p><h1>Claims queue</h1><p class="muted">Triage, assign and progress reported claims.</p></div><span class="count-pill">{{filtered().length}} claims</span></section>
    <section class="panel"><div class="filters"><input placeholder="Search claim, claimant or policy..." aria-label="Search claims" [value]="query()" (input)="query.set($any($event.target).value)"><select aria-label="Filter claim status" [value]="status()" (change)="status.set($any($event.target).value)"><option value="All">All statuses</option><option>Submitted</option><option>Under Review</option><option>Awaiting Documents</option><option>Approved</option><option>Declined</option><option>Paid</option></select></div>
      <div class="table-wrap"><table><thead><tr><th>Claim number</th><th>Claimant</th><th>Claim type</th><th>Reported</th><th>Amount</th><th>Priority</th><th>Status</th></tr></thead><tbody>
      @for (c of filtered(); track c.id) {<tr><td><a class="text-link" [routerLink]="['/claims',c.id]">{{c.number}}</a><small class="cell-sub">{{c.policyId}}</small></td><td>{{c.claimant}}</td><td>{{c.type}}</td><td>{{c.reportedDate | date:'dd MMM yyyy'}}</td><td>{{c.amount | currency:'INR':'symbol':'1.0-0'}}</td><td><span class="priority" [class]="c.priority.toLowerCase()">{{c.priority}}</span></td><td><span class="status">{{c.status}}</span></td></tr>}
      @empty {<tr><td colspan="7" class="empty">No claims match your filters.</td></tr>}
      </tbody></table></div>
    </section>
  `
})
export class ClaimsComponent {
  readonly data = inject(InsuranceDataService);
  readonly query = signal('');
  readonly status = signal('All');
  readonly filtered = computed(() => {
    const q = this.query().toLowerCase();
    return this.data.claims().filter(c => (this.status() === 'All' || c.status === this.status()) &&
      [c.number,c.claimant,c.type,c.policyId].some(v => v.toLowerCase().includes(q)));
  });
}
