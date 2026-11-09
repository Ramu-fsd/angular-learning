import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccount, BankTransaction } from '../typescript-fundamentals/account.models';

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  private readonly http = inject(HttpClient);

  getAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>('/api/accounts');
  }

  getTransactions(accountId: string): Observable<BankTransaction[]> {
    const encodedId = encodeURIComponent(accountId);
    return this.http.get<BankTransaction[]>(`/api/accounts/${encodedId}/transactions`);
  }
}
