import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BankingDataService } from '../../core/banking-data.service';
@Component({standalone:true,imports:[ReactiveFormsModule,DatePipe],template:`
<section class="page"><h1>Service requests</h1><p>Raise a request with customer support.</p><div class="layout"><section class="panel"><h2>New request</h2><form [formGroup]="form" (ngSubmit)="submit()"><label>Request type<select formControlName="type"><option value="">Select a request</option><option>Statement request</option><option>Debit card support</option><option>Address update</option><option>Account assistance</option></select></label><label>Description<textarea rows="4" formControlName="description" maxlength="500"></textarea></label><small>{{form.controls.description.value.length}} / 500 characters</small><button [disabled]="form.invalid">Submit request</button></form>@if(reference()){<p class="success" role="status">Request submitted. Reference: {{reference()}}</p>}</section>
<section class="panel"><h2>Submitted requests</h2>@for(r of data.serviceRequests();track r.reference){<article><b>{{r.type}}</b><small>{{r.reference}} · {{r.status}}</small><p>{{r.description}}</p></article>}@empty{<p class="empty">No requests submitted in this session.</p>}</section></div></section>`,
styles:[`.page{padding:30px}h1{font-size:25px}p{font-size:12px;color:#7d899c}.layout{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}.panel{background:white;border:1px solid #e7ebf2;border-radius:10px;padding:19px}.panel h2{font-size:15px;margin-top:0}label{display:block;font-size:10px;color:#68768c;margin:12px 0}input,select,textarea{display:block;width:100%;padding:10px;border:1px solid #dce2eb;border-radius:6px;margin-top:5px;font:inherit}textarea{resize:vertical}button{padding:10px 13px;background:#315bb7;color:white;border:0;border-radius:6px;cursor:pointer}button:disabled{opacity:.45}.success{color:#18744e}article{padding:12px 0;border-top:1px solid #edf0f5}article b,article small{display:block}article b{font-size:11px}article small{font-size:9px;color:#7d899c;margin-top:4px}article p{font-size:11px}.empty{color:#8792a4}@media(max-width:760px){.page{padding:22px 14px}.layout{grid-template-columns:1fr}}`]
})
export class ServiceRequestsComponent {
 readonly data=inject(BankingDataService);
 readonly fb=inject(FormBuilder);
 readonly reference=signal('');
 readonly form=this.fb.nonNullable.group({type:['',[Validators.required]],description:['',[Validators.required,Validators.minLength(10),Validators.maxLength(500)]]});
 submit(){if(this.form.invalid){this.form.markAllAsTouched();return;}this.reference.set(this.data.submitServiceRequest(this.form.controls.type.value,this.form.controls.description.value));this.form.reset();}
}
