import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InsuranceDataService } from '../insurance-data.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <section class="page-head"><div><p class="eyebrow">POLICY SERVICING</p><h1>Policy portfolio</h1><p class="muted">Search policy records and review coverage at a glance.</p></div><span class="count-pill">{{filtered().length}} policies</span></section>
    <section class="panel"><div class="filters"><input aria-label="Search policies" placeholder="Search holder, policy number or product..." [value]="query()" (input)="query.set($any($event.target).value)"><select aria-label="Filter policy status" [value]="status()" (change)="status.set($any($event.target).value)"><option value="All">All statuses</option><option>Active</option><option>Pending</option><option>Expired</option><option>Cancelled</option></select></div>
      <div class="table-wrap"><table><thead><tr><th>Policy number</th><th>Policyholder</th><th>Product</th><th>Premium</th><th>Sum insured</th><th>Status</th><th></th></tr></thead><tbody>
      @for (p of filtered(); track p.id) {<tr><td><a class="text-link" [routerLink]="['/policies',p.id]">{{p.number}}</a></td><td>{{p.holder}}</td><td>{{p.product}}</td><td>{{p.premium | currency:'INR':'symbol':'1.0-0'}}</td><td>{{p.sumInsured | currency:'INR':'symbol':'1.0-0'}}</td><td><span class="status">{{p.status}}</span></td><td><a [routerLink]="['/policies',p.id]" class="text-link">Open →</a></td></tr>}
      @empty {<tr><td colspan="7" class="empty">No policies match your filters.</td></tr>}
      </tbody></table></div>
    </section>
  `
})
export class PoliciesComponent {
  readonly data = inject(InsuranceDataService);
  readonly query = signal('');
  readonly status = signal('All');
  readonly filtered = computed(() => {
    const q = this.query().toLowerCase();
    return this.data.policies().filter(p => (this.status() === 'All' || p.status === this.status()) &&
      [p.number,p.holder,p.product].some(v => v.toLowerCase().includes(q)));
  });
}
