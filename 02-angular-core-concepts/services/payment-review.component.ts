import { Component, inject, signal } from '@angular/core';
import { PaymentService } from './payment.service';
import { PaymentSubmission } from './payment.models';

@Component({
  selector: 'app-payment-review',
  standalone: true,
  template: `
    <h2>Payment review</h2>
    <p>Review the payment details before confirming in the secure payment flow.</p>
    <button type="button" (click)="submitDemoPayment()" [disabled]="submitting()">
      {{ submitting() ? 'Submitting…' : 'Submit demo payment' }}
    </button>
    @if (result(); as payment) {
      <p role="status">Payment {{ payment.paymentId }}: {{ payment.status }}</p>
    }
    @if (errorMessage()) {
      <p role="alert">{{ errorMessage() }}</p>
    }
  `
})
export class PaymentReviewComponent {
  private readonly paymentService = inject(PaymentService);

  readonly submitting = signal(false);
  readonly result = signal<PaymentSubmission | null>(null);
  readonly errorMessage = signal('');

  submitDemoPayment(): void {
    if (this.submitting()) return;

    this.submitting.set(true);
    this.errorMessage.set('');

    this.paymentService.submitPayment({
      sourceAccountId: 'acct-demo-1001',
      beneficiaryId: 'ben-demo-201',
      amountMinorUnits: 25000,
      currency: 'INR',
      idempotencyKey: crypto.randomUUID()
    }).subscribe({
      next: (response) => {
        this.result.set(response);
        this.submitting.set(false);
      },
      error: () => {
        this.errorMessage.set('Payment could not be submitted. Check the payment status before trying again.');
        this.submitting.set(false);
      }
    });
  }
}
