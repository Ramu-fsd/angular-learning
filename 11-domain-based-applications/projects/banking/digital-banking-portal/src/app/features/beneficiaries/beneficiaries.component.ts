import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankingDataService } from '../../core/banking-data.service';
@Component({standalone:true,imports:[ReactiveFormsModule],template:`
<section class="page"><h1>Beneficiaries</h1><p>Manage payees registered in this demo profile.</p>
<div class="layout"><section class="panel"><h2>Registered beneficiaries</h2>@for(b of data.beneficiaries();track b.id){<article class="beneficiary"><span class="initial">{{b.name.charAt(0)}}</span><div><b>{{b.name}}</b><small>{{b.bankName}} · {{b.maskedAccount}}</small></div><em>{{b.status==='ACTIVE'?'Active':'Pending verification'}}</em></article>}</section>
<section class="panel"><h2>Add beneficiary</h2><form [formGroup]="form" (ngSubmit)="submit()">
<label>Beneficiary name<input formControlName="name"></label>
<label>Bank name<input formControlName="bankName"></label>
<label>Account number<input formControlName="accountNumber" inputmode="numeric" maxlength="18"></label>
@if(form.controls.accountNumber.touched&&form.controls.accountNumber.invalid){<small class="error">Enter an account number containing 8–18 digits.</small>}
<button [disabled]="form.invalid">Submit for verification</button>
@if(message()){<p class="success" role="status">{{message()}}</p>}
</form><p class="hint">Demo action only. A real bank verifies payee details and may require step-up authentication.</p></section></div></section>`,
styles:[`.page{padding:30px}h1{font-size:25px}p{font-size:12px;color:#7d899c}.layout{display:grid;grid-template-columns:1.2fr 1fr;gap:14px;margin-top:20px}.panel{background:white;border:1px solid #e7ebf2;border-radius:10px;padding:19px}.panel h2{font-size:15px;margin-top:0}.beneficiary{display:flex;align-items:center;gap:10px;padding:13px 0;border-top:1px solid #edf0f5}.initial{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#eaf0fc;color:#315bb7}.beneficiary div{flex:1}.beneficiary b,.beneficiary small{display:block}.beneficiary b{font-size:11px}.beneficiary small{font-size:9px;color:#7d899c;margin-top:4px}.beneficiary em{font-size:9px;color:#987018;font-style:normal}form label{display:block;font-size:10px;color:#68768c;margin:12px 0}form input{display:block;width:100%;padding:10px;border:1px solid #dce2eb;border-radius:6px;margin-top:5px}button{padding:10px 13px;background:#315bb7;color:white;border:0;border-radius:6px;cursor:pointer}button:disabled{opacity:.45}.error{color:#b33d30}.success{color:#18744e}.hint{font-size:10px}@media(max-width:760px){.page{padding:22px 14px}.layout{grid-template-columns:1fr}}`]
})
export class BeneficiariesComponent {
 readonly data=inject(BankingDataService);
 readonly fb=inject(FormBuilder);
 readonly message=signal('');
 readonly form=this.fb.nonNullable.group({
  name:['',[Validators.required,Validators.maxLength(80)]],
  bankName:['',[Validators.required,Validators.maxLength(80)]],
  accountNumber:['',[Validators.required,Validators.pattern(/^\d{8,18}$/)]]
 });
 submit(){if(this.form.invalid){this.form.markAllAsTouched();return;}this.data.addBeneficiary(this.form.getRawValue());this.form.reset();this.message.set('Beneficiary submitted. Verification is pending in this demo.');}
}
