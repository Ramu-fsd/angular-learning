# Service-based state with RxJS

Use an injectable service as a shared state container when multiple components need the same state but a full Redux-style store would be excessive.

## Example: payment operations queue

`payment-queue.service.ts` keeps the current queue in a `BehaviorSubject`. Components consume the observable with the `async` pipe and request state changes through service methods.

```ts
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
    const next = this.paymentsSubject.value.map(payment =>
      payment.id === id ? { ...payment, status: 'APPROVED' as const } : payment
    );
    this.paymentsSubject.next(next);
  }
}
```

## Exercise

Add `reject(id)`, `addPayment(payment)`, and a derived pending count. Avoid exposing the subject itself to consumers.
