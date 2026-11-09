import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LendingDataService } from '../../core/lending-data.service';
import { DocumentStatus, LoanStatus } from '../../core/lending.models';

@Component({
 standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink],
 template:`
 @if(loan();as a){
 <a routerLink="/" class="back">← Back to loan pipeline</a>
 <div class="title"><div><span class="eyebrow">UNDERWRITING WORKSPACE</span><h1>{{a.applicant}}</h1><p>{{a.id}} · {{a.customerRef}} · {{a.submittedAt|date:'medium'}}</p></div><span class="risk" [class]="a.riskBand.toLowerCase()">{{a.riskBand}} RISK</span></div>
 <div class="grid">
  <section class="panel"><h2>Loan request</h2><dl><dt>Product</dt><dd>{{a.product}}</dd><dt>Requested amount</dt><dd class="amount">{{a.requestedAmount|currency:a.currency}}</dd><dt>Term</dt><dd>{{a.termMonths}} months</dd><dt>Purpose</dt><dd>{{a.purpose}}</dd><dt>Employment</dt><dd>{{a.employment}}</dd><dt>Annual income</dt><dd>{{a.annualIncome|currency:a.currency}}</dd><dt>Monthly obligations</dt><dd>{{a.monthlyObligations|currency:a.currency}}</dd><dt>Assigned underwriter</dt><dd>{{a.assignedTo||'Unassigned'}}</dd></dl><div class="assessment"><b>Assessment summary</b><p>{{a.assessment}}</p></div><button class="secondary" (click)="assign()">Assign to me</button></section>
  <section class="panel"><h2>Document checklist</h2>@for(d of a.documents;track d.id){<div class="doc"><div><b>{{d.name}}</b><small>{{d.fileName}}</small></div><select [value]="d.status" (change)="review(d.id,$any($event.target).value)"><option value="PENDING">PENDING</option><option value="VERIFIED">VERIFIED</option><option value="REUPLOAD_REQUIRED">REUPLOAD REQUIRED</option></select></div>}<h2 class="section-title">Illustrative affordability indicators</h2><div class="indicator"><span>Monthly gross income</span><b>{{a.annualIncome/12|currency:a.currency}}</b></div><div class="indicator"><span>Existing monthly obligations</span><b>{{a.monthlyObligations|currency:a.currency}}</b></div><p class="disclaimer">These figures are display-only. No debt-to-income or eligibility result is calculated by this frontend.</p></section>
 </div>
 <section class="panel decision"><h2>Underwriter decision & notes</h2><label>Application status<select [value]="a.status" (change)="setStatus($any($event.target).value)"><option value="SUBMITTED">SUBMITTED</option><option value="IN_REVIEW">IN REVIEW</option><option value="MORE_INFORMATION_REQUIRED">MORE INFORMATION REQUIRED</option><option value="APPROVED">APPROVED</option><option value="DECLINED">DECLINED</option></select></label><label>Underwriter note<textarea rows="3" [value]="note()" (input)="note.set($any($event.target).value)" placeholder="Record evidence reviewed, exceptions, or rationale"></textarea></label><button (click)="addNote()" [disabled]="!note().trim()">Add note</button>@if(message()){<p class="message" role="status">{{message()}}</p>}<div class="notes">@for(n of notes();track n.id){<article><b>{{n.author}}</b><time>{{n.createdAt|date:'medium'}}</time><p>{{n.body}}</p></article>}@empty{<p class="hint">No underwriter notes recorded.</p>}</div></section>
 }@else{<p>Loan application not found. <a routerLink="/">Return to pipeline</a></p>}
 `,
 styles:[`
 .back{font-size:11px;color:#315bb7;text-decoration:none}.title{display:flex;justify-content:space-between;align-items:center;margin:15px 0 20px}.eyebrow{font-size:9px;color:#4268bd;font-weight:800;letter-spacing:1.3px}.title h1{font-size:25px;margin:6px 0}.title p,.hint{font-size:11px;color:#8190a3}.risk{font-size:10px;padding:7px 10px;border-radius:20px;background:#f0f2f6}.risk.high{background:#fde9e8;color:#a72f2a}.risk.medium{background:#fff5dc;color:#94620c}.risk.low{background:#e5f5ee;color:#24704f}
 .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.panel{background:#fff;border:1px solid #e6eaf1;border-radius:10px;padding:18px}.panel h2{font-size:15px;margin:0 0 14px}dl{display:grid;grid-template-columns:1fr 1fr;gap:13px}dt{font-size:10px;color:#8290a3}dd{font-size:11px;font-weight:600;margin:5px 0 0}.amount{font-size:20px;color:#315bb7}
 .assessment{margin-top:16px;background:#edf3ff;padding:12px;border-radius:7px;font-size:11px}.assessment p{margin:6px 0 0;color:#61718a;line-height:1.5}.secondary{margin-top:12px;background:#edf2fc;color:#315bb7}
 .doc{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:11px 0;border-top:1px solid #edf0f5}.doc b,.doc small{display:block}.doc b{font-size:11px}.doc small{font-size:9px;color:#8290a3;margin-top:4px}.doc select{max-width:150px}.section-title{margin-top:20px!important}.indicator{display:flex;justify-content:space-between;border-top:1px solid #edf0f5;padding:10px 0;font-size:10px}.indicator span{color:#8290a3}.disclaimer{font-size:9px;line-height:1.5;color:#8a6b32;background:#fff8e8;padding:9px;border-radius:6px}
 .decision{margin-top:14px}.decision label{display:block;font-size:10px;color:#68768b;margin:12px 0}.decision label:first-of-type{max-width:300px}select,textarea{display:block;width:100%;margin-top:6px;padding:9px;border:1px solid #dce2eb;border-radius:6px;background:#fff;font:inherit}button{border:0;border-radius:6px;background:#315bb7;color:#fff;padding:9px 12px;font-size:11px;cursor:pointer}button:disabled{opacity:.4}.message{font-size:11px;color:#28734e}.notes article{border-top:1px solid #edf0f5;padding:11px 0}.notes b,.notes time{font-size:10px}.notes time{float:right;color:#8290a3}.notes p{font-size:11px;color:#596980;line-height:1.5;margin:6px 0}
 @media(max-width:750px){.grid{grid-template-columns:1fr}.title{align-items:flex-start;flex-direction:column;gap:10px}dl{gap:11px}}
 `]
})
export class LoanDetailComponent {
 private readonly route=inject(ActivatedRoute);readonly data=inject(LendingDataService);readonly id=this.route.snapshot.paramMap.get('id')??'';
 readonly loan=computed(()=>this.data.find(this.id));readonly notes=computed(()=>this.data.notes().filter(n=>n.applicationId===this.id));
 readonly note=signal('');readonly message=signal('');
 assign(){this.data.assign(this.id);this.message.set('Application assigned to you in demo state.');}
 review(docId:string,status:DocumentStatus){this.data.reviewDocument(this.id,docId,status);this.message.set('Document review updated in demo state.');}
 setStatus(status:LoanStatus){this.data.updateStatus(this.id,status);this.message.set(`Application status changed to ${status} in demo state.`);}
 addNote(){const body=this.note().trim();if(!body)return;this.data.addNote(this.id,body);this.note.set('');this.message.set('Underwriter note added in demo state.');}
}
