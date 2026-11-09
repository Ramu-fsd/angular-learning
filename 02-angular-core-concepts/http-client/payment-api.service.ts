import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentRecord {
  readonly paymentId: string;
  readonly maskedBeneficiary: string;
  readonly amountMinorUnits: number;
  readonly currency: 'INR';
  readonly status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  readonly createdAt: string;
}

export interface Page<T> {
  readonly content: readonly T[];
  readonly page: number;
  readonly size: number;
  readonly totalElements: number;
  readonly totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class PaymentApiService {
  private readonly http = inject(HttpClient);

  searchPayments(status: string, page = 0, size = 20): Observable<Page<PaymentRecord>> {
    const params = new HttpParams()
      .set('status', status)
      .set('page', page)
      .set('size', size);

    return this.http.get<Page<PaymentRecord>>('/api/payments', { params });
  }

  getPayment(paymentId: string): Observable<PaymentRecord> {
    return this.http.get<PaymentRecord>(
      `/api/payments/${encodeURIComponent(paymentId)}`
    );
  }
}
