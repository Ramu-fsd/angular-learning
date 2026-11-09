import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BeneficiarySummary, PaymentDraftRequest, PaymentSubmission
} from './payment.models';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly http = inject(HttpClient);

  getBeneficiaries(): Observable<BeneficiarySummary[]> {
    return this.http.get<BeneficiarySummary[]>('/api/beneficiaries');
  }

  submitPayment(request: PaymentDraftRequest): Observable<PaymentSubmission> {
    return this.http.post<PaymentSubmission>('/api/payments', request);
  }
}
