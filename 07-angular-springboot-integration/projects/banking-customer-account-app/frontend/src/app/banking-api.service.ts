import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccount, CreateAccountRequest, CreateCustomerRequest, Customer } from './models';

@Injectable({ providedIn: 'root' })
export class BankingApiService {
  private readonly http = inject(HttpClient);

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('/api/customers');
  }

  createCustomer(request: CreateCustomerRequest): Observable<Customer> {
    return this.http.post<Customer>('/api/customers', request);
  }

  getAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>('/api/accounts');
  }

  createAccount(request: CreateAccountRequest): Observable<BankAccount> {
    return this.http.post<BankAccount>('/api/accounts', request);
  }
}
