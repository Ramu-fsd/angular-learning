import {Component,computed,inject,signal} from '@angular/core';
import {CurrencyPipe,DatePipe} from '@angular/common';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {PaymentDataService} from '../../core/payment-data.service';
@Component({standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink],template:`
<section class="page">@if(payment();as p){<a routerLink="/payments" class="back">← Back to queue</a><div class="title"><div><span class="eyebrow">PAYMENT REVIEW</span><h1>{{p.id}}</h1><p>{{p.reference}} · {{p.createdAt|date:'medium'}}</p></div><span class="pill">{{p.status.replace('_',' ')}}</span></div>
<div class="grid"><article class="panel"><h2>Payment instruction</h2><dl><dt>Beneficiary</dt><dd>{{p.beneficiary}}</dd><dt>Beneficiary account</dt><dd>{{p.beneficiaryAccountMasked}}</dd><dt>Source account</dt><dd>{{p.sourceAccountMasked}}</dd><dt>Purpose</dt><dd>{{p.purpose}}</dd><dt>Submitted by</dt><dd>{{p.submittedBy}}</dd><dt>Amount</dt><dd class="amount">{{p.amount|currency:p.currency}}</dd></dl></article>
<article class="panel"><h2>Review decision</h2><p class="hint">Current operator: {{data.currentOperator()}}</p>
@if(p.status==='PENDING_APPROVAL'){<p class="hint">Approval requires a different operator from the submitter.</p><label>Rejection reason<textarea rows="3" [value]="reason()" (input)="reason.set($any($event.target).value)" placeholder="Required when rejecting"></textarea></label><div class="actions"><button class="reject" (click)="reject()">Reject</button><button (click)="approve()">Approve</button></div>}
@if(message()){<p class="message" role="status">{{message()}}</p>}
@if(p.rejectionReason){<p class="message">Rejection reason: {{p.rejectionReason}}</p>}
</article></div>
<article class="panel audit"><h2>Audit timeline</h2>@for(e of events();track e.id){<div class="event"><b>{{e.action}}</b><span>{{e.actor}} · {{e.timestamp|date:'medium'}}</span>@if(e.reason){<small>{{e.reason}}</small>}</div>}@empty{<p class="hint">No audit events for this payment.</p>}</article>
}@else{<p>Payment not found.</p>}</section>`,
styles:[`.page{padding:28px;max-width:1100px}.back{color:#315bb7;text-decoration:none;font-size:11px}.title{display:flex;justify-content:space-between;align-items:center;margin:18px 0}.eyebrow{font-size:9px;color:#315bb7;font-weight:800;letter-spacing:1.2px}.title h1{font-size:25px;margin:6px 0}.title p,.hint{font-size:11px;color:#7d899c}.pill{font-size:9px;background:#fff3dc;color:#946200;padding:7px 9px;border-radius:20px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.panel{background:white;border:1px solid #e7ebf2;border-radius:10px;padding:19px}.panel h2{font-size:15px;margin-top:0}dl{display:grid;grid-template-columns:1fr 1fr;gap:12px}dt{font-size:10px;color:#7d899c}dd{font-size:11px;margin:4px 0 0;font-weight:600}.amount{font-size:21px;color:#315bb7}label{display:block;font-size:10px;color:#718096}textarea{display:block;width:100%;margin-top:7px;border:1px solid #dce2eb;border-radius:6px;padding:9px;font:inherit}.actions{display:flex;justify-content:flex-end;gap:8px;margin-top:15px}button{border:0;border-radius:6px;background:#315bb7;color:white;padding:9px 12px;cursor:pointer}.reject{background:#a33d35}.message{font-size:11px;color:#a33d35;line-height:1.5}.audit{margin-top:14px}.event{border-top:1px solid #edf0f5;padding:12px 0}.event b,.event span,.event small{display:block}.event b{font-size:11px}.event span,.event small{font-size:9px;color:#7d899c;margin-top:4px}@media(max-width:750px){.page{padding:20px 13px}.grid{grid-template-columns:1fr}dl{grid-template-columns:1fr 1fr}}`]})
export class PaymentDetailComponent{
 private readonly route=inject(ActivatedRoute);readonly data=inject(PaymentDataService);
 readonly id=this.route.snapshot.paramMap.get('id')??'';
 readonly payment=computed(()=>this.data.find(this.id));
 readonly events=computed(()=>this.data.audit().filter(e=>e.paymentId===this.id));
 readonly reason=signal('');readonly message=signal('');
 approve(){const error=this.data.approve(this.id);this.message.set(error??'Payment approved in demo state.');}
 reject(){const error=this.data.reject(this.id,this.reason());this.message.set(error??'Payment rejected in demo state.');}
}
