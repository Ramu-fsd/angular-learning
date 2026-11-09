import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InsuranceDataService } from '../insurance-data.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    @if (policy; as p) {
      <a routerLink="/policies" class="back-link">← Back to policies</a>
      <section class="page-head"><div><p class="eyebrow">POLICY DETAILS · {{p.number}}</p><h1>{{p.holder}}</h1><p class="muted">{{p.product}} · <span class="status">{{p.status}}</span></p></div><div class="head-actions"><a class="secondary" routerLink="/claims">Claims queue</a></div></section>
      <section class="detail-grid"><article class="panel"><h2>Policy summary</h2><div class="facts"><div><small>Policy number</small><strong>{{p.number}}</strong></div><div><small>Policyholder</small><strong>{{p.holder}}</strong></div><div><small>Effective from</small><strong>{{p.startDate | date:'dd MMM yyyy'}}</strong></div><div><small>Expires on</small><strong>{{p.endDate | date:'dd MMM yyyy'}}</strong></div><div><small>Annual premium</small><strong>{{p.premium | currency:'INR':'symbol':'1.0-0'}}</strong></div><div><small>Sum insured</small><strong>{{p.sumInsured | currency:'INR':'symbol':'1.0-0'}}</strong></div></div></article>
      <article class="panel"><h2>Insured contact</h2><div class="contact"><span class="avatar large">{{getInitials(p.holder)}}</span><div><strong>{{p.holder}}</strong><p>{{p.email}}</p><p>{{p.phone}}</p></div></div><h2 class="subheading">Coverage overview</h2><ul class="coverage">@for (item of p.coverage; track item) {<li><span>✓</span>{{item}}</li>}</ul></article></section>
      <section class="panel"><h2>Related claims</h2>@for (c of relatedClaims; track c.id) {<div class="related"><div><a class="text-link" [routerLink]="['/claims',c.id]">{{c.number}}</a><p class="muted">{{c.type}} · {{c.status}}</p></div><strong>{{c.amount | currency:'INR':'symbol':'1.0-0'}}</strong></div>} @empty {<p class="muted">No claims are linked to this policy.</p>}</section>
    } @else {<section class="panel"><h2>Policy not found</h2><a routerLink="/policies">Return to portfolio</a></section>}
  `
})
export class PolicyDetailComponent {
  private route = inject(ActivatedRoute);
  readonly data = inject(InsuranceDataService);
  readonly policy = this.data.policies().find(p => p.id === this.route.snapshot.paramMap.get('id'));
  get relatedClaims() { return this.data.claims().filter(c => c.policyId === this.policy?.id); }
  
  getInitials(name: string): string {
  return name
    .split(' ')
    .filter(part => part.length > 0)
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}
}
