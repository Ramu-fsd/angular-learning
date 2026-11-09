import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OperationsService } from './operations.service';

@Component({
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <section class="page">
      <div class="heading"><div><p class="eyebrow">SERVICE DELIVERY</p><h1>Work queue</h1><p class="sub">Search, prioritize, and coordinate operational work.</p></div><a class="primary" routerLink="/work/new">＋ Create work item</a></div>
      <div class="filters"><input placeholder="Search ID, title, requester or owner..." [value]="search()" (input)="search.set($any($event.target).value)"><select [value]="status()" (change)="status.set($any($event.target).value)"><option value="All">All statuses</option><option>New</option><option>In Progress</option><option>Pending</option><option>Resolved</option></select><select [value]="priority()" (change)="priority.set($any($event.target).value)"><option value="All">All priorities</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select><select [value]="type()" (change)="type.set($any($event.target).value)"><option value="All">All types</option><option>Incident</option><option>Service Request</option></select></div>
      <div class="result-line">{{filtered().length}} work items <span>Sorted by most recently created</span></div>
      <div class="list">
        @for (item of filtered(); track item.id) {
          <a class="work-card" [routerLink]="['/work',item.id]"><div class="work-main"><div class="id">{{item.id}} <span class="pill" [class]="item.priority.toLowerCase()">{{item.priority}}</span></div><h3>{{item.title}}</h3><p>{{item.description}}</p><div class="meta"><span>{{item.type}}</span><span>Requester: {{item.requester}}</span><span>Owner: {{item.assignee}}</span></div></div><div class="work-side"><span class="status">{{item.status}}</span><small>Due {{item.dueAt | date:'MMM d, h:mm a'}}</small><b>View details →</b></div></a>
        } @empty { <div class="empty">No work items match these filters. Try changing your search criteria.</div> }
      </div>
    </section>
  `,
  styles: [`
    .page{padding:30px 34px;max-width:1300px;margin:auto}.heading{display:flex;justify-content:space-between;align-items:center;gap:15px}.eyebrow{font-size:10px;letter-spacing:1.4px;color:#8794a7;font-weight:700;margin:0 0 8px}h1{font-size:27px;margin:0;color:#1b2b43}.sub{color:#8591a1;font-size:13px;margin:8px 0 0}.primary{background:#2867c7;color:#fff;text-decoration:none;padding:11px 15px;border-radius:7px;font-size:12px;font-weight:700}.filters{display:flex;gap:10px;margin:27px 0 17px}.filters input,.filters select{border:1px solid #dfe5ed;background:#fff;border-radius:7px;padding:11px;font-size:11px;color:#506078}.filters input{flex:1;min-width:180px}.result-line{font-size:11px;color:#4b5e78;margin-bottom:12px}.result-line span{color:#9aa4b1;margin-left:8px}.list{display:grid;gap:10px}.work-card{display:flex;justify-content:space-between;gap:20px;background:#fff;border:1px solid #e7ebf1;border-radius:9px;padding:17px 19px;text-decoration:none;color:inherit}.work-card:hover{border-color:#9abbe9;box-shadow:0 4px 14px #1c47700c}.id{font-size:10px;color:#2867c7;font-weight:700}.pill{margin-left:8px;padding:4px 8px;border-radius:20px;font-size:9px;background:#f1f3f6;color:#59677a}.critical{background:#ffebe8;color:#c84c3f}.high{background:#fff2e3;color:#b86c16}.medium{background:#eaf2ff;color:#386ab0}.low{background:#eef5f0;color:#528064}.work-main h3{font-size:14px;color:#273a55;margin:8px 0}.work-main p{font-size:11px;color:#8793a3;margin:0;line-height:1.5}.meta{display:flex;gap:17px;flex-wrap:wrap;margin-top:13px;color:#8a96a6;font-size:10px}.work-side{display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;min-width:145px}.status{font-size:10px;color:#4b5f7b;background:#f1f5fa;padding:5px 8px;border-radius:5px}.work-side small{font-size:10px;color:#8d99a9}.work-side b{font-size:10px;color:#2867c7}.empty{background:#fff;padding:35px;text-align:center;color:#8491a1;border:1px solid #e7ebf1;border-radius:9px;font-size:12px}@media(max-width:760px){.page{padding:22px 15px}.heading{align-items:flex-start;flex-direction:column}.filters{flex-wrap:wrap}.filters input{flex-basis:100%}.work-card{flex-direction:column}.work-side{align-items:flex-start;gap:10px}}
  `]
})
export class WorkQueueComponent {
  readonly ops = inject(OperationsService);
  readonly search = signal('');
  readonly status = signal('All');
  readonly priority = signal('All');
  readonly type = signal('All');
  readonly filtered = computed(() => {
    const query = this.search().toLowerCase();
    return this.ops.items().filter((item) => {
      const matchesText = [item.id, item.title, item.requester, item.assignee].join(' ').toLowerCase().includes(query);
      return matchesText && (this.status() === 'All' || item.status === this.status())
        && (this.priority() === 'All' || item.priority === this.priority())
        && (this.type() === 'All' || item.type === this.type());
    });
  });
}
