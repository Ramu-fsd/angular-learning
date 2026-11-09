import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, startWith, switchMap, catchError, of } from 'rxjs';

interface PaymentStatusResponse {
  readonly paymentId: string;
  readonly status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  readonly updatedAt: string;
}

@Component({
  selector: 'app-payment-status',
  standalone: true,
  template: `
    <h2>Payment tracking</h2>
    @if (status(); as current) {
      <p>Payment {{ current.paymentId }}: {{ current.status }}</p>
      <time>{{ current.updatedAt }}</time>
    } @else {
      <p role="status">Waiting for payment status…</p>
    }
    @if (errorMessage()) {
      <p role="alert">{{ errorMessage() }}</p>
    }
  `
})
export class PaymentStatusComponent {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly status = signal<PaymentStatusResponse | null>(null);
  readonly errorMessage = signal('');

  constructor() {
    interval(10_000).pipe(
      startWith(0),
      switchMap(() =>
        this.http.get<PaymentStatusResponse>('/api/payments/demo-payment-001/status')
          .pipe(catchError(() => {
            this.errorMessage.set('Status is temporarily unavailable.');
            return of(null);
          }))
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((response) => {
      if (response) {
        this.status.set(response);
        this.errorMessage.set('');
      }
    });
  }
}
