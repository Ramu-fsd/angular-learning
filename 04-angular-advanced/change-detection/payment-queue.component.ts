import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

interface Payment {
  readonly id: string;
  readonly reference: string;
  readonly amountMinorUnits: number;
  readonly status: PaymentStatus;
}

@Component({
  selector: 'app-payment-queue-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Payment queue</h2>
    <p>Pending items: {{ pendingCount() }}</p>

    @for (payment of payments(); track payment.id) {
      <article>
        <strong>{{ payment.reference }}</strong>
        <span>{{ payment.status }}</span>
        <button type="button" (click)="complete(payment.id)"
          [disabled]="payment.status === 'COMPLETED'">
          Mark completed (demo)
        </button>
      </article>
    } @empty {
      <p>No payments in the queue.</p>
    }
  `
})
export class PaymentQueueComponent {
  readonly payments = signal<readonly Payment[]>([
    { id: 'p-201', reference: 'PAY-200201', amountMinorUnits: 159900, status: 'PENDING' },
    { id: 'p-202', reference: 'PAY-200202', amountMinorUnits: 72000, status: 'PROCESSING' },
    { id: 'p-203', reference: 'PAY-200203', amountMinorUnits: 31000, status: 'COMPLETED' }
  ]);

  readonly pendingCount = computed(() =>
    this.payments().filter((payment) =>
      payment.status === 'PENDING' || payment.status === 'PROCESSING'
    ).length
  );

  complete(id: string): void {
    this.payments.update((items) =>
      items.map((payment) =>
        payment.id === id ? { ...payment, status: 'COMPLETED' } : payment
      )
    );
  }
}
