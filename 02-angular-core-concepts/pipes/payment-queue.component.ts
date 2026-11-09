import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TransactionStatusPipe } from './transaction-status.pipe';
import { MaskedReferencePipe } from './masked-reference.pipe';

@Component({
  selector: 'app-payment-queue',
  standalone: true,
  imports: [DatePipe, TransactionStatusPipe, MaskedReferencePipe],
  template: `
    <h2>Payment queue</h2>
    @for (payment of payments; track payment.id) {
      <article>
        <strong>{{ payment.reference | maskedReference:5 }}</strong>
        <span>{{ payment.status | transactionStatus }}</span>
        <time>{{ payment.createdAt | date:'medium' }}</time>
      </article>
    } @empty {
      <p>No payments are waiting for review.</p>
    }
  `
})
export class PaymentQueueComponent {
  readonly payments = [
    { id: 'pay-001', reference: 'PAYMENT-2026-84721', status: 'PENDING', createdAt: '2026-11-09T10:15:00Z' },
    { id: 'pay-002', reference: 'PAYMENT-2026-84722', status: 'COMPLETED', createdAt: '2026-11-09T10:18:00Z' }
  ];
}
