import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaymentsService } from './payments.service';
import { PaymentStatus } from './payment.models';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, FormsModule],
  template: `
    <section class="page"><a routerLink="/" class="back">← Back to payment queue</a>
      @if (payment(); as item) {
        <div class="heading"><div><p class="eyebrow">{{item.id}} · {{item.reference}}</p><h1>{{item.beneficiary}}</h1><p class="sub">Requested by {{item.requestedBy}} · {{item.createdAt | date:'medium'}}</p></div><span class="status" [class]="statusClass(item.status)">{{item.status}}</span></div>
        <div class="layout"><div class="left">
          <article class="panel"><h2>Payment instruction</h2><div class="amount">{{item.amount | currency:item.currency:'symbol':'1.2-2'}}</div><div class="facts"><div><small>DEBTOR</small><b>{{item.debtor}}</b></div><div><small>BENEFICIARY</small><b>{{item.beneficiary}}</b></div><div><small>BENEFICIARY BANK</small><b>{{item.beneficiaryBank}}</b></div><div><small>PAYMENT CHANNEL</small><b>{{item.channel}}</b></div><div><small>PRIORITY</small><b>{{item.priority}}</b></div><div><small>PURPOSE</small><b>{{item.purpose}}</b></div></div></article>
          <article class="panel"><h2>Payment activity</h2><div class="timeline">@for (event of item.activity; track event.id) {<div class="event"><span class="dot"></span><div><b>{{event.actor}}</b><small>{{event.at | date:'medium'}}</small><p>{{event.message}}</p></div></div>}</div></article>
          <article class="panel"><h2>Operations note</h2><div class="note-row"><textarea [(ngModel)]="note" placeholder="Add an operational note..."></textarea><button (click)="addNote()" [disabled]="!note.trim()">Add note</button></div></article>
        </div>
        <aside class="panel actions"><h2>Payment controls</h2><p>Simulated maker-checker and lifecycle actions.</p>
          @if (item.status === 'Pending Approval') {
            <button class="approve" (click)="changeStatus('Processing','Payment approved by checker. Payment moved to processing.')">Approve payment</button>
            <button class="reject" (click)="changeStatus('Rejected','Payment rejected during checker review.')">Reject payment</button>
          } @else if (item.status === 'Processing') {
            <button class="approve" (click)="changeStatus('Completed','Simulated payment rail confirmation received.')">Mark completed</button>
            <button class="reject" (click)="changeStatus('Failed','Operations marked payment as failed in the demonstration.')">Mark failed</button>
          } @else {<div class="closed">No lifecycle actions are available for this payment status.</div>}
          <div class="control-note">Production approval must be authorized by a distinct checker identity on the server. These buttons only update local demo state.</div>
        </aside></div>
      } @else {<article class="panel">Payment not found. Return to the payment queue.</article>}
    </section>
  `,
  styles: [`
    .page{max-width:1250px;margin:auto;padding:28px 30px}.back{font-size:10px;color:#6558b2;text-decoration:none}.heading{display:flex;justify-content:space-between;align-items:center;margin:22px 0}.eyebrow{font-size:9px;color:#6558b2;letter-spacing:1px;font-weight:700;margin:0 0 8px}h1{font-size:24px;color:#20334d;margin:0}.sub{font-size:10px;color:#8b98a8;margin:7px 0}.status{font-size:8px;padding:6px 9px;border-radius:5px;background:#f1f3f6;color:#63748a}.status.pending-approval{background:#fff3df;color:#a87927}.status.processing{background:#eaf2ff;color:#3972b4}.status.completed{background:#e8f7ef;color:#32845a}.status.rejected,.status.failed{background:#ffedeb;color:#bd5149}.layout{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:14px}.left{display:grid;gap:13px}.panel{background:#fff;border:1px solid #e7ecf2;border-radius:9px;padding:18px}.panel h2{font-size:13px;color:#2b3f59;margin:0 0 15px}.amount{font-size:25px;font-weight:700;color:#243951;margin-bottom:18px}.facts{display:grid;grid-template-columns:repeat(2,1fr);gap:17px;border-top:1px solid #edf0f4;padding-top:16px}.facts small{display:block;font-size:8px;letter-spacing:.8px;color:#98a4b2;margin-bottom:6px}.facts b{font-size:10px;color:#42546d}.timeline{display:grid;gap:16px}.event{display:flex;gap:10px}.dot{width:9px;height:9px;border-radius:50%;background:#7769c0;border:2px solid #e9e5fb;margin-top:3px;flex-shrink:0}.event b{font-size:10px;color:#40536d}.event small{font-size:8px;color:#9aa5b2;margin-left:8px}.event p{font-size:10px;color:#7e8b9c;margin:5px 0 0;line-height:1.5}.note-row{display:flex;gap:8px}.note-row textarea{flex:1;min-height:55px;border:1px solid #dfe6ee;border-radius:6px;padding:9px;font:10px Arial;resize:vertical}.note-row button,.actions button{border:0;border-radius:6px;padding:10px 12px;font-size:9px;font-weight:700;cursor:pointer}.note-row button{background:#6558b2;color:#fff;align-self:flex-end}.note-row button:disabled{opacity:.4}.actions>p{font-size:9px;color:#8996a7;line-height:1.5;margin:-7px 0 16px}.actions button{width:100%;margin:0 0 8px}.approve{background:#e8f7ef;color:#2e8055}.reject{background:#ffedeb;color:#b94e47}.closed{padding:12px;background:#f5f7fa;border-radius:6px;font-size:9px;color:#8794a5;line-height:1.5}.control-note{margin-top:12px;padding:10px;background:#fff8e9;border-radius:6px;color:#8b7955;font-size:9px;line-height:1.6}@media(max-width:800px){.page{padding:22px 15px}.heading{align-items:flex-start;flex-direction:column}.layout{grid-template-columns:1fr}}
  `]
})
export class PaymentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly payments = inject(PaymentsService);
  readonly payment = computed(() => this.payments.getById(this.route.snapshot.paramMap.get('id') || ''));
  note = '';
  statusClass(value: string): string { return value.toLowerCase().replaceAll(' ', '-'); }
  changeStatus(status: PaymentStatus, message: string): void {
    const item = this.payment();
    if (item) this.payments.updateStatus(item.id, status, 'You', message);
  }
  addNote(): void {
    const item = this.payment();
    const value = this.note.trim();
    if (item && value) { this.payments.addNote(item.id, value); this.note = ''; }
  }
}
