import { Component, computed, signal } from '@angular/core';

type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

interface PaymentRow {
  readonly id: string;
  readonly reference: string;
  readonly amountMinorUnits: number;
  readonly status: PaymentStatus;
}

@Component({
  selector: 'app-payment-dashboard',
  standalone: true,
  template: `
    <h2>Payment dashboard</h2>

    <label for="statusFilter">Status</label>
    <select id="statusFilter" [value]="statusFilter()" (change)="setStatus($event)">
      <option value="ALL">All</option>
      <option value="PENDING">Pending</option>
      <option value="COMPLETED">Completed</option>
      <option value="FAILED">Failed</option>
    </select>

    <p>Visible payments: {{ filteredPayments().length }}</p>
    <p>Visible amount: INR {{ visibleAmountRupees().toFixed(2) }}</p>

    @for (payment of filteredPayments(); track payment.id) {
      <article>
        <strong>{{ payment.reference }}</strong>
        <span>{{ payment.status }}</span>
        <button type="button" (click)="selectPayment(payment.id)">Select</button>
      </article>
    } @empty {
      <p>No payments match this filter.</p>
    }

    @if (selectedPaymentId()) {
      <p aria-live="polite">Selected payment: {{ selectedPaymentId() }}</p>
    }
  `
})
export class PaymentDashboardComponent {
  readonly payments = signal<readonly PaymentRow[]>([
    { id: 'p-101', reference: 'PAY-100101', amountMinorUnits: 125050, status: 'PENDING' },
    { id: 'p-102', reference: 'PAY-100102', amountMinorUnits: 98000, status: 'COMPLETED' },
    { id: 'p-103', reference: 'PAY-100103', amountMinorUnits: 45000, status: 'FAILED' }
  ]);

  readonly statusFilter = signal<'ALL' | PaymentStatus>('ALL');
  readonly selectedPaymentId = signal<string | null>(null);

  readonly filteredPayments = computed(() => {
    const filter = this.statusFilter();
    return filter === 'ALL'
      ? this.payments()
      : this.payments().filter((payment) => payment.status === filter);
  });

  readonly visibleAmountRupees = computed(() =>
    this.filteredPayments().reduce(
      (total, payment) => total + payment.amountMinorUnits, 0
    ) / 100
  );

  setStatus(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'ALL' || value === 'PENDING' ||
        value === 'COMPLETED' || value === 'FAILED') {
      this.statusFilter.set(value);
    }
  }

  selectPayment(paymentId: string): void {
    this.selectedPaymentId.set(paymentId);
  }
}
