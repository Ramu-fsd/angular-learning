import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Payment {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
}

const INITIAL_PAYMENTS: Payment[] = [
  { id: 'p-1001', reference: 'PAY-2026-1001', amount: 12500, currency: 'INR', status: 'PENDING' },
  { id: 'p-1002', reference: 'PAY-2026-1002', amount: 8400, currency: 'INR', status: 'APPROVED' }
];

@Injectable({ providedIn: 'root' })
export class PaymentQueueService {
  private readonly paymentsSubject = new BehaviorSubject<Payment[]>(INITIAL_PAYMENTS);
  readonly payments$ = this.paymentsSubject.asObservable();

  approve(id: string): void {
    this.paymentsSubject.next(
      this.paymentsSubject.value.map(payment =>
        payment.id === id ? { ...payment, status: 'APPROVED' } : payment
      )
    );
  }

  reject(id: string): void {
    this.paymentsSubject.next(
      this.paymentsSubject.value.map(payment =>
        payment.id === id ? { ...payment, status: 'REJECTED' } : payment
      )
    );
  }
}
