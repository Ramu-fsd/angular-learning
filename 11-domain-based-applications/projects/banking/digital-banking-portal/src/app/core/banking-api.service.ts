import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccount, BankTransaction, Beneficiary, ServiceRequest } from '../models/banking.models';

/**
 * Production integration boundary.
 * Configure the API base URL for each environment. The demo screens currently use
 * BankingDataService so the app can run without a backend.
 */
@Injectable({ providedIn: 'root' })
export class BankingApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1';

  getAccounts(): Observable<{ items: BankAccount[] }> {
    return this.http.get<{ items: BankAccount[] }>(`${this.baseUrl}/accounts`);
  }

  getTransactions(accountId: string, page = 0, size = 20, query = ''):
    Observable<{ items: BankTransaction[]; page: number; size: number; totalElements: number }> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('query', query);
    return this.http.get<{ items: BankTransaction[]; page: number; size: number; totalElements: number }>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/transactions`, { params }
    );
  }

  getBeneficiaries(): Observable<{ items: Beneficiary[] }> {
    return this.http.get<{ items: Beneficiary[] }>(`${this.baseUrl}/beneficiaries`);
  }

  addBeneficiary(request: { name: string; bankName: string; accountNumber: string }):
    Observable<Beneficiary> {
    return this.http.post<Beneficiary>(`${this.baseUrl}/beneficiaries`, request);
  }

  createServiceRequest(request: { type: string; description: string }):
    Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(`${this.baseUrl}/service-requests`, request);
  }
}
