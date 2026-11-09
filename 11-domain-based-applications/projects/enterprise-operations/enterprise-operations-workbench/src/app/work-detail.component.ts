import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OperationsService } from './operations.service';
import { Priority, WorkStatus } from './work.models';

@Component({
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule],
  template: `
    <section class="page">
      <a routerLink="/work" class="back">← Back to work queue</a>
      @if (item(); as work) {
        <div class="heading"><div><p class="eyebrow">{{work.id}} · {{work.type}}</p><h1>{{work.title}}</h1><p class="sub">Created {{work.createdAt | date:'medium'}} by {{work.requester}}</p></div><span class="status">{{work.status}}</span></div>
        <div class="layout"><div class="left">
          <article class="card"><h2>Work description</h2><p class="description">{{work.description}}</p><div class="facts"><div><small>REQUESTER</small><b>{{work.requester}}</b></div><div><small>DEPARTMENT</small><b>{{work.department}}</b></div><div><small>CREATED</small><b>{{work.createdAt | date:'mediumDate'}}</b></div><div><small>SLA TARGET</small><b>{{work.dueAt | date:'medium'}}</b></div></div></article>
          <article class="card"><h2>Activity and notes</h2><div class="note-entry"><textarea [(ngModel)]="note" placeholder="Add a handover note or operational update..."></textarea><button (click)="addNote()" [disabled]="!note.trim()">Add note</button></div><div class="timeline">@for (entry of work.activity; track entry.id) {<div class="event"><span class="dot"></span><div><b>{{entry.actor}}</b><small>{{entry.at | date:'medium'}}</small><p>{{entry.message}}</p></div></div>}</div></article>
        </div><aside class="card controls"><h2>Work management</h2><label>Assignee<select [ngModel]="work.assignee" (ngModelChange)="updateAssignee($event)"><option>Unassigned</option><option>Priya Nair</option><option>Arjun Rao</option><option>Meera Shah</option><option>Karthik Reddy</option><option>Ramu Boya</option></select></label><label>Priority<select [ngModel]="work.priority" (ngModelChange)="updatePriority($event)"><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label><label>Status<select [ngModel]="work.status" (ngModelChange)="updateStatus($event)"><option>New</option><option>In Progress</option><option>Pending</option><option>Resolved</option></select></label><div class="control-hint">Changes are reflected immediately in this local demonstration.</div></aside></div>
      } @else { <div class="card">Work item not found.</div> }
    </section>
  `,
  styles: [`
    .page{padding:28px 34px;max-width:1300px;margin:auto}.back{font-size:11px;color:#2867c7;text-decoration:none}.heading{display:flex;justify-content:space-between;align-items:center;margin:23px 0}.eyebrow{font-size:10px;color:#2867c7;letter-spacing:1px;font-weight:700;margin:0 0 8px}h1{font-size:25px;color:#1b2b43;margin:0}.sub{font-size:11px;color:#8b97a7;margin:8px 0}.status{background:#edf3fa;color:#4e6480;padding:7px 10px;border-radius:6px;font-size:10px}.layout{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:16px}.left{display:grid;gap:15px}.card{background:#fff;border:1px solid #e7ebf1;border-radius:10px;padding:20px}.card h2{font-size:14px;color:#2b3d56;margin:0 0 17px}.description{font-size:12px;line-height:1.7;color:#748196}.facts{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;border-top:1px solid #edf0f4;margin-top:20px;padding-top:17px}.facts small{display:block;color:#9aa4b1;font-size:9px;letter-spacing:1px;margin-bottom:6px}.facts b{font-size:11px;color:#40536d}.controls label{display:block;font-size:10px;color:#738096;margin:17px 0}.controls select{display:block;width:100%;margin-top:7px;padding:10px;border:1px solid #dfe5ed;border-radius:6px;background:#fff;color:#40536d;font-size:11px}.control-hint{font-size:10px;line-height:1.6;color:#9aa4b1;background:#f7f9fc;padding:10px;border-radius:6px}.note-entry{display:flex;gap:9px}.note-entry textarea{flex:1;min-height:62px;border:1px solid #dfe5ed;border-radius:6px;padding:10px;font:11px Arial;resize:vertical}.note-entry button{align-self:flex-end;border:0;background:#2867c7;color:#fff;padding:10px 13px;border-radius:6px;font-size:10px;cursor:pointer}.note-entry button:disabled{opacity:.4;cursor:not-allowed}.timeline{margin-top:22px}.event{display:flex;gap:12px;padding:0 0 20px;position:relative}.dot{width:9px;height:9px;background:#4382cf;border:2px solid #e4efff;border-radius:50%;margin-top:3px;flex-shrink:0}.event b{font-size:11px;color:#40536d}.event small{font-size:9px;color:#9aa4b1;margin-left:9px}.event p{font-size:11px;color:#7c899b;margin:6px 0 0;line-height:1.5}@media(max-width:850px){.page{padding:22px 15px}.layout{grid-template-columns:1fr}.heading{align-items:flex-start;gap:10px;flex-direction:column}}
  `]
})
export class WorkDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly ops = inject(OperationsService);
  readonly item = computed(() => this.ops.getById(this.route.snapshot.paramMap.get('id') || ''));
  note = '';
  updateAssignee(value: string): void { const item = this.item(); if (item) this.ops.update(item.id, { assignee: value }); }
  updatePriority(value: Priority): void { const item = this.item(); if (item) this.ops.update(item.id, { priority: value }); }
  updateStatus(value: WorkStatus): void { const item = this.item(); if (item) this.ops.update(item.id, { status: value }); }
  addNote(): void { const item = this.item(); const message = this.note.trim(); if (item && message) { this.ops.addNote(item.id, message); this.note = ''; } }
}
