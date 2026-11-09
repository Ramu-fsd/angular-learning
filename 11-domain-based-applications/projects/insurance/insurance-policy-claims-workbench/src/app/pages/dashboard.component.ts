import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InsuranceDataService } from '../insurance-data.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page-head"><div><p class="eyebrow">OPERATIONS OVERVIEW</p><h1>Good morning, Alex</h1><p class="muted">A consolidated view of policy servicing and claims activity.</p></div><a class="primary" routerLink="/claims">Review claims <span>→</span></a></section>
    <section class="stats">
      <article class="stat"><span class="stat-icon blue">▤</span><span class="stat-label">Total policies</span><strong>{{data.policies().length}}</strong><small>Across all product lines</small></article>
      <article class="stat"><span class="stat-icon violet">◷</span><span class="stat-label">Open claims</span><strong>{{data.openClaims()}}</strong><small>Require operational attention</small></article>
      <article class="stat"><span class="stat-icon amber">₹</span><span class="stat-label">Claims reserve</span><strong>{{data.totalExposure() | currency:'INR':'symbol':'1.0-0'}}</strong><small>Current demo exposure</small></article>
      <article class="stat"><span class="stat-icon green">✓</span><span class="stat-label">Active policies</span><strong>{{activePolicies}}</strong><small>Currently in force</small></article>
    </section>
    <section class="panel"><div class="panel-head"><div><h2>Claims requiring attention</h2><p class="muted">Prioritized operational work queue</p></div><a routerLink="/claims" class="text-link">View all claims →</a></div>
      <div class="table-wrap"><table><thead><tr><th>Claim</th><th>Claimant</th><th>Type</th><th>Reported</th><th>Priority</th><th>Status</th></tr></thead><tbody>
        @for (c of data.claims().slice(0,4); track c.id) { <tr><td><a [routerLink]="['/claims',c.id]" class="text-link">{{c.number}}</a></td><td>{{c.claimant}}</td><td>{{c.type}}</td><td>{{c.reportedDate | date:'dd MMM yyyy'}}</td><td><span class="priority" [class]="c.priority.toLowerCase()">{{c.priority}}</span></td><td><span class="status">{{c.status}}</span></td></tr> }
      </tbody></table></div>
    </section>
    <section class="panel"><div class="panel-head"><div><h2>Policy portfolio</h2><p class="muted">Recent policy records</p></div><a routerLink="/policies" class="text-link">View portfolio →</a></div>
      <div class="policy-grid">@for (p of data.policies().slice(0,3); track p.id) {<a class="policy-card" [routerLink]="['/policies',p.id]"><span class="eyebrow">{{p.product}}</span><strong>{{p.holder}}</strong><span class="muted">{{p.number}}</span><span class="status">{{p.status}}</span></a>}</div>
    </section>
  `
})
export class DashboardComponent {
  readonly data = inject(InsuranceDataService);
  get activePolicies(): number { return this.data.policies().filter(p => p.status === 'Active').length; }
}
