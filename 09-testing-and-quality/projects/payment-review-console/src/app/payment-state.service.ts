import { Injectable, computed, signal } from '@angular/core';
import { Payment } from './payment.models';

@Injectable({ providedIn: 'root' })
export class PaymentStateService {
  readonly payments = signal<Payment[]>([
    { id: 'p-1001', reference: 'PAY-2026-1001', beneficiary: 'Metro Utilities', amount: 18400, status: 'PENDING' },
    { id: 'p-1002', reference: 'PAY-2026-1002', beneficiary: 'Aster Healthcare', amount: 62500, status: 'PENDING' },
    { id: 'p-1003', reference: 'PAY-2026-1003', beneficiary: 'Northwind Supplies', amount: 127500, status: 'APPROVED' }
  ]);

  readonly pendingCount = computed(() =>
    this.payments().filter(payment => payment.status === 'PENDING').length
  );

  approve(paymentId: string): void {
    this.payments.update(items => items.map(payment =>
      payment.id === paymentId ? { ...payment, status: 'APPROVED' } : payment
    ));
  }
}
