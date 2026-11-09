import {Component,inject,signal} from '@angular/core';
import {FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms';
import {Router,RouterLink} from '@angular/router';
import {PaymentDataService} from '../../core/payment-data.service';
@Component({standalone:true,imports:[ReactiveFormsModule,RouterLink],template:`
<section class="page"><a routerLink="/payments" class="back">← Back to queue</a><h1>Create payment instruction</h1><p class="muted">Enter the instruction details. Submission creates a pending approval item in this demo.</p>
<form class="panel" [formGroup]="form" (ngSubmit)="submit()">
<div class="fields"><label>Beneficiary name<input formControlName="beneficiary"></label><label>Beneficiary account number<input formControlName="beneficiaryAccount" inputmode="numeric"></label><label>Source account<select formControlName="sourceAccount"><option value="•••• 4821">Operating account •••• 4821</option><option value="•••• 9014">Settlement account •••• 9014</option></select></label><label>Reference<input formControlName="reference"></label><label>Amount<input type="number" min="0.01" step="0.01" formControlName="amount"></label><label>Currency<select formControlName="currency"><option>USD</option><option>EUR</option><option>GBP</option></select></label></div>
<label>Payment purpose<textarea rows="3" formControlName="purpose"></textarea></label>
@if(form.invalid&&submitted()){<p class="error">Please correct the required fields. Amount must be greater than zero and account number must contain 8–18 digits.</p>}
<div class="actions"><a routerLink="/payments">Cancel</a><button [disabled]="form.invalid">Submit for approval</button></div>
</form></section>`,
styles:[`.page{padding:28px;max-width:900px}.back{font-size:11px;color:#315bb7;text-decoration:none}h1{font-size:25px;margin:14px 0 5px}.muted{font-size:12px;color:#7d899c}.panel{margin-top:20px;background:white;border:1px solid #e7ebf2;border-radius:10px;padding:22px}.fields{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}label{display:block;font-size:10px;color:#68768c;margin:10px 0}input,select,textarea{display:block;width:100%;margin-top:6px;padding:10px;border:1px solid #dce2eb;border-radius:6px;background:white;font:inherit}textarea{resize:vertical}.actions{display:flex;justify-content:flex-end;align-items:center;gap:15px;margin-top:18px}.actions a{font-size:11px;color:#718096;text-decoration:none}button{background:#315bb7;color:white;border:0;border-radius:6px;padding:10px 14px;cursor:pointer}button:disabled{opacity:.4}.error{font-size:11px;color:#b33d30}@media(max-width:650px){.page{padding:20px 13px}.fields{grid-template-columns:1fr}}`]})
export class PaymentCreateComponent{
 private readonly fb=inject(FormBuilder);private readonly router=inject(Router);private readonly data=inject(PaymentDataService);
 readonly submitted=signal(false);
 readonly form=this.fb.nonNullable.group({
  beneficiary:['',[Validators.required,Validators.maxLength(100)]],
  beneficiaryAccount:['',[Validators.required,Validators.pattern(/^\d{8,18}$/)]],
  sourceAccount:['•••• 4821',[Validators.required]],
  reference:['',[Validators.required,Validators.maxLength(40)]],
  amount:[0.01,[Validators.required,Validators.min(0.01)]],
  currency:['USD',[Validators.required]],
  purpose:['',[Validators.required,Validators.minLength(5),Validators.maxLength(160)]]
 });
 submit(){this.submitted.set(true);if(this.form.invalid){this.form.markAllAsTouched();return;}
 const v=this.form.getRawValue();const id=this.data.create({beneficiary:v.beneficiary,beneficiaryAccountMasked:`•••• ${v.beneficiaryAccount.slice(-4)}`,sourceAccountMasked:v.sourceAccount,reference:v.reference,amount:v.amount,currency:v.currency,purpose:v.purpose});
 this.router.navigate(['/payments',id]);
 }
}
