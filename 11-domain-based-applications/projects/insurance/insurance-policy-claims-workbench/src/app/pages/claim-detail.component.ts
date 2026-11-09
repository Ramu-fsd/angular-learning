import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InsuranceDataService } from '../insurance-data.service';
import { ClaimStatus } from '../models';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, FormsModule],
  template: `
    @if (claim(); as c) {
      <a routerLink="/claims" class="back-link">← Back to claims queue</a>
      <section class="page-head"><div><p class="eyebrow">CLAIM FILE · {{c.number}}</p><h1>{{c.claimant}}</h1><p class="muted">{{c.type}} · <span class="status">{{c.status}}</span></p></div><span class="priority" [class]="c.priority.toLowerCase()">{{c.priority}} priority</span></section>
      <section class="detail-grid">
        <article class="panel"><div class="panel-head"><div><h2>Loss information</h2><p class="muted">Reported incident and claim details</p></div></div><p class="description">{{c.description}}</p>
          <div class="facts"><div><small>Policy reference</small><strong><a class="text-link" [routerLink]="['/policies',c.policyId]">{{c.policyId}}</a></strong></div><div><small>Loss date</small><strong>{{c.lossDate | date:'dd MMM yyyy'}}</strong></div><div><small>Reported date</small><strong>{{c.reportedDate | date:'dd MMM yyyy'}}</strong></div><div><small>Claim amount</small><strong>{{c.amount | currency:'INR':'symbol':'1.0-0'}}</strong></div><div><small>Current reserve</small><strong>{{c.reserve | currency:'INR':'symbol':'1.0-0'}}</strong></div><div><small>Assigned adjuster</small><strong>{{c.adjuster}}</strong></div></div>
        </article>
        <article class="panel"><h2>Claim workflow</h2><label class="field-label" for="adjuster">Assigned adjuster</label><select id="adjuster" [ngModel]="c.adjuster" (ngModelChange)="assign($event)"><option>Unassigned</option><option>Alex Morgan</option><option>Neha Kapoor</option><option>Daniel Joseph</option></select>
          <label class="field-label" for="claimStatus">Claim status</label><select id="claimStatus" [ngModel]="c.status" (ngModelChange)="changeStatus($event)"><option>Submitted</option><option>Under Review</option><option>Awaiting Documents</option><option>Approved</option><option>Declined</option><option>Paid</option></select>
          <div class="notice">Status changes are local demo actions. Production transitions require server-side permissions, coverage validation and audit logging.</div>
        </article>
      </section>
      <section class="detail-grid">
        <article class="panel"><h2>Evidence checklist</h2><p class="muted">Document receipt status for this claim</p>@for (e of c.evidence; track e.name) {<div class="evidence"><span class="check" [class.received]="e.received">{{e.received ? '✓' : '!'}}</span><span>{{e.name}}</span><strong [class.good]="e.received">{{e.received ? 'Received' : 'Outstanding'}}</strong></div>}</article>
        <article class="panel"><h2>Operational notes</h2><div class="note-list">@for (note of c.notes; track $index) {<div class="note"><span class="note-dot"></span><p>{{note}}</p></div>} @empty {<p class="muted">No notes recorded.</p>}</div><label class="field-label" for="newNote">Add a note</label><textarea id="newNote" rows="3" [value]="noteText()" (input)="noteText.set($any($event.target).value)" placeholder="Record a concise operational update..."></textarea><button class="primary full" (click)="addNote()" [disabled]="!noteText().trim()">Add note</button></article>
      </section>
    } @else {<section class="panel"><h2>Claim not found</h2><a routerLink="/claims">Return to claims queue</a></section>}
  `
})
export class ClaimDetailComponent {
  private route = inject(ActivatedRoute);
  readonly data = inject(InsuranceDataService);
  readonly claim = computed(() => this.data.claims().find(c => c.id === this.route.snapshot.paramMap.get('id')));
  readonly noteText = signal('');
  assign(adjuster: string): void { const c = this.claim(); if (c) this.data.updateClaim(c.id, { adjuster }); }
  changeStatus(status: ClaimStatus): void { const c = this.claim(); if (c) this.data.setStatus(c.id, status); }
  addNote(): void { const c = this.claim(); const note = this.noteText().trim(); if (c && note) { this.data.addNote(c.id, note); this.noteText.set(''); } }
}
