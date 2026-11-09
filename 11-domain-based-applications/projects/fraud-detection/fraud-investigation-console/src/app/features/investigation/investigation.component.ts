import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FraudDataService } from '../../core/fraud-data.service';
import { AlertStatus } from '../../core/fraud.models';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    @if(alert();as a){
      <a class="back" routerLink="/alerts">← Back to alert queue</a>
      <div class="title"><div><span class="eyebrow">INVESTIGATION WORKSPACE</span><h1>{{a.id}}</h1><p>{{a.transactionId}} · Created {{a.createdAt|date:'medium'}}</p></div><span class="severity" [class]="a.severity.toLowerCase()">{{a.severity}} · {{a.riskScore}} risk score</span></div>
      <div class="layout">
        <section class="panel"><h2>Transaction context</h2><dl><dt>Merchant</dt><dd>{{a.merchant}}</dd><dt>Customer reference</dt><dd>{{a.customerRef}}</dd><dt>Amount</dt><dd class="amount">{{a.amount|currency:a.currency}}</dd><dt>Channel</dt><dd>{{a.channel}}</dd><dt>Country</dt><dd>{{a.country}}</dd><dt>Current status</dt><dd>{{a.status}}</dd><dt>Assigned analyst</dt><dd>{{a.assignedTo||'Unassigned'}}</dd></dl><div class="reason"><b>Risk explanation</b><p>{{a.reason}}</p></div></section>
        <section class="panel"><h2>Analyst actions</h2><p class="hint">Signed-in analyst: {{data.currentAnalyst()}}</p><button class="assign" (click)="assign()" [disabled]="a.status==='CLOSED'">Assign to me</button>
          <label>Case disposition<select [value]="a.status" (change)="changeStatus($any($event.target).value)"><option value="OPEN">OPEN</option><option value="INVESTIGATING">INVESTIGATING</option><option value="ESCALATED">ESCALATED</option><option value="CLOSED">CLOSED</option></select></label>
          <label>Investigation note<textarea rows="4" [value]="note()" (input)="note.set($any($event.target).value)" placeholder="Record evidence reviewed, customer contact, or next steps"></textarea></label>
          <button (click)="saveNote()" [disabled]="!note().trim()">Add note</button>
          @if(message()){<p class="message" role="status">{{message()}}</p>}
        </section>
      </div>
      <section class="panel timeline"><h2>Investigation notes</h2>
        @for(n of notes();track n.id){<article><b>{{n.author}}</b><time>{{n.createdAt|date:'medium'}}</time><p>{{n.body}}</p></article>}
        @empty{<p class="hint">No analyst notes have been recorded for this alert.</p>}
      </section>
    } @else {<section class="panel">Alert not found. <a routerLink="/alerts">Return to queue</a></section>}
  `,
  styles: [`
    .back{font-size:11px;color:#315bb7;text-decoration:none}.title{display:flex;justify-content:space-between;align-items:center;margin:16px 0 20px}.eyebrow{font-size:9px;color:#4268bd;font-weight:800;letter-spacing:1.3px}.title h1{font-size:25px;margin:6px 0}.title p,.hint{font-size:11px;color:#8190a3}.severity{font-size:10px;padding:7px 10px;border-radius:20px;background:#f1f3f7}.severity.critical{background:#fde9e8;color:#a72f2a}.severity.high{background:#fff0df;color:#99520d}.severity.medium{background:#fff8d9;color:#806500}.severity.low{background:#e5f5ee;color:#24704f}
    .layout{display:grid;grid-template-columns:1.1fr .9fr;gap:14px}.panel{background:#fff;border:1px solid #e6eaf1;border-radius:10px;padding:19px}.panel h2{font-size:15px;margin:0 0 15px}dl{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:0}dt{font-size:10px;color:#8290a3}dd{font-size:11px;font-weight:600;margin:5px 0 0}.amount{font-size:20px;color:#315bb7}.reason{margin-top:18px;background:#fff7e9;padding:12px;border-radius:7px;font-size:11px}.reason p{color:#725d3b;line-height:1.5;margin:6px 0 0}
    label{display:block;font-size:10px;color:#68768b;margin:14px 0}select,textarea{display:block;width:100%;margin-top:6px;padding:10px;border:1px solid #dce2eb;border-radius:6px;background:#fff;font:inherit}button{border:0;border-radius:6px;background:#315bb7;color:#fff;padding:10px 13px;font-size:11px;cursor:pointer}.assign{background:#edf2fc;color:#315bb7;margin:0 0 5px}.assign:disabled,button:disabled{opacity:.45;cursor:not-allowed}.message{font-size:11px;color:#26744e}.timeline{margin-top:14px}.timeline article{border-top:1px solid #edf0f5;padding:12px 0}.timeline b,.timeline time{font-size:10px}.timeline time{float:right;color:#8290a3}.timeline p{font-size:11px;color:#596980;line-height:1.5;margin:7px 0 0}
    @media(max-width:750px){.layout{grid-template-columns:1fr}.title{align-items:flex-start;gap:12px;flex-direction:column}dl{gap:12px}}
  `]
})
export class InvestigationComponent {
  private readonly route = inject(ActivatedRoute);
  readonly data = inject(FraudDataService);
  readonly id = this.route.snapshot.paramMap.get('id') ?? '';
  readonly alert = computed(() => this.data.find(this.id));
  readonly notes = computed(() => this.data.notes().filter(n => n.alertId === this.id));
  readonly note = signal('');
  readonly message = signal('');
  assign(){this.data.assign(this.id);this.message.set('Alert assigned to you in demo state.');}
  saveNote(){const body=this.note().trim();if(!body)return;this.data.addNote(this.id,body);this.note.set('');this.message.set('Investigation note added in demo state.');}
  changeStatus(status:AlertStatus){this.data.updateStatus(this.id,status);this.message.set(`Status changed to ${status} in demo state.`);}
}
