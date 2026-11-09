import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PaymentsService } from './payments.service';
import { PaymentPriority } from './payment.models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page"><a routerLink="/" class="back">← Back to payment queue</a><p class="eyebrow">PAYMENT OPERATIONS</p><h1>Initiate payment</h1><p class="sub">Create a synthetic payment instruction for the maker-checker workflow.</p>
      <form [formGroup]="form" (ngSubmit)="submit()"><div class="form-grid">
        <label>Debtor / source account<input formControlName="debtor" placeholder="Source account or business unit"></label>
        <label>Beneficiary name<input formControlName="beneficiary" placeholder="Beneficiary legal name"></label>
        <label>Beneficiary bank<input formControlName="beneficiaryBank" placeholder="Bank and location"></label>
        <label>Requested by<input formControlName="requestedBy" placeholder="Maker name"></label>
        <label>Amount<input type="number" min="0.01" step="0.01" formControlName="amount"></label>
        <label>Currency<select formControlName="currency"><option>INR</option><option>USD</option><option>EUR</option><option>GBP</option></select></label>
        <label>Payment channel<select formControlName="channel"><option>Domestic Transfer</option><option>Wire Transfer</option><option>Internal Transfer</option></select></label>
        <label>Priority<select formControlName="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label>
        <label class="wide">Payment purpose<textarea rows="3" formControlName="purpose" placeholder="Business purpose or invoice reference"></textarea></label>
      </div><div class="approval-info"><b>Maker-checker control</b><span>Submitting this form creates a payment in Pending Approval. The demo approval buttons are available on the payment detail page.</span></div><div class="actions"><a routerLink="/">Cancel</a><button type="submit" [disabled]="form.invalid">Submit for approval</button></div></form>
    </section>
  `,
  styles: [`
    .page{max-width:900px;margin:auto;padding:28px 30px}.back{font-size:10px;color:#6558b2;text-decoration:none}.eyebrow{font-size:9px;color:#8293a7;letter-spacing:1.4px;font-weight:700;margin:25px 0 8px}h1{font-size:25px;color:#20334d;margin:0}.sub{font-size:11px;color:#8996a7;margin:8px 0 23px}form{background:#fff;border:1px solid #e7ecf2;border-radius:9px;padding:21px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}label{font-size:10px;color:#53657c}.wide{grid-column:1/-1}input,select,textarea{display:block;width:100%;box-sizing:border-box;margin-top:7px;padding:10px;border:1px solid #dfe6ee;border-radius:6px;font:11px Arial;color:#34465e;background:#fff}textarea{resize:vertical}.approval-info{display:flex;flex-direction:column;gap:5px;background:#f4f1ff;border:1px solid #e6e0fb;padding:12px;border-radius:6px;margin-top:20px;font-size:9px;color:#777096;line-height:1.5}.approval-info b{color:#5f52a5}.actions{display:flex;justify-content:flex-end;align-items:center;gap:17px;border-top:1px solid #edf0f4;margin-top:20px;padding-top:17px}.actions a{font-size:10px;color:#78869a;text-decoration:none}.actions button{background:#6558b2;color:#fff;border:0;border-radius:6px;padding:11px 15px;font-size:10px;font-weight:700;cursor:pointer}.actions button:disabled{opacity:.4;cursor:not-allowed}@media(max-width:600px){.page{padding:22px 15px}.form-grid{grid-template-columns:1fr}.wide{grid-column:auto}form{padding:15px}}
  `]
})
export class CreatePaymentComponent {
  private readonly fb = inject(FormBuilder);
  private readonly payments = inject(PaymentsService);
  private readonly router = inject(Router);
  readonly form = this.fb.nonNullable.group({
    debtor: ['', Validators.required],
    beneficiary: ['', Validators.required],
    beneficiaryBank: ['', Validators.required],
    requestedBy: ['', Validators.required],
    amount: [1000, [Validators.required, Validators.min(0.01)]],
    currency: ['INR', Validators.required],
    channel: ['Domestic Transfer' as 'Domestic Transfer' | 'Wire Transfer' | 'Internal Transfer', Validators.required],
    priority: ['Normal' as PaymentPriority, Validators.required],
    purpose: ['', [Validators.required, Validators.minLength(8)]]
  });
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const id = this.payments.create(this.form.getRawValue());
    this.router.navigate(['/', id]);
  }
}
