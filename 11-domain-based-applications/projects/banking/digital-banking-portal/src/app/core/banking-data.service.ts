import { Injectable, computed, signal } from '@angular/core';
import { BankAccount, BankTransaction, Beneficiary, ServiceRequest } from '../models/banking.models';

@Injectable({ providedIn: 'root' })
export class BankingDataService {
  readonly accounts = signal<BankAccount[]>([
    { accountId:'ACC-1001', displayName:'Everyday Checking', maskedNumber:'•••• 4821', accountType:'CHECKING', currency:'USD', availableBalance:12840.55 },
    { accountId:'ACC-1002', displayName:'High Yield Savings', maskedNumber:'•••• 9014', accountType:'SAVINGS', currency:'USD', availableBalance:32500 },
    { accountId:'ACC-1003', displayName:'Investment Account', maskedNumber:'•••• 1180', accountType:'INVESTMENT', currency:'USD', availableBalance:18750.25 }
  ]);

  readonly transactions = signal<BankTransaction[]>([
    {transactionId:'TX-9001',accountId:'ACC-1001',date:'2026-11-08',description:'Payroll deposit',category:'Income',amount:4250,currency:'USD',status:'POSTED'},
    {transactionId:'TX-9002',accountId:'ACC-1001',date:'2026-11-07',description:'Electricity payment',category:'Utilities',amount:-126.4,currency:'USD',status:'POSTED'},
    {transactionId:'TX-9003',accountId:'ACC-1001',date:'2026-11-06',description:'Grocery market',category:'Shopping',amount:-84.22,currency:'USD',status:'POSTED'},
    {transactionId:'TX-9004',accountId:'ACC-1002',date:'2026-11-05',description:'Monthly savings transfer',category:'Transfer',amount:500,currency:'USD',status:'POSTED'},
    {transactionId:'TX-9005',accountId:'ACC-1001',date:'2026-11-04',description:'Restaurant',category:'Dining',amount:-48.75,currency:'USD',status:'PENDING'}
  ]);

  readonly beneficiaries = signal<Beneficiary[]>([
    {id:'BEN-01',name:'Morgan Supplies',bankName:'First National Bank',maskedAccount:'•••• 7721',status:'ACTIVE'},
    {id:'BEN-02',name:'Taylor Services',bankName:'Citywide Bank',maskedAccount:'•••• 3902',status:'PENDING_VERIFICATION'}
  ]);

  readonly serviceRequests = signal<ServiceRequest[]>([]);
  readonly totalBalance = computed(() => this.accounts().reduce((sum, account) => sum + account.availableBalance, 0));

  addBeneficiary(input: { name: string; bankName: string; accountNumber: string }): void {
    const suffix = input.accountNumber.slice(-4);
    this.beneficiaries.update(items => [{
      id: `BEN-${String(items.length + 1).padStart(2,'0')}`,
      name: input.name,
      bankName: input.bankName,
      maskedAccount: `•••• ${suffix}`,
      status: 'PENDING_VERIFICATION'
    }, ...items]);
  }

  submitServiceRequest(type: string, description: string): string {
    const reference = `SR-${Date.now().toString().slice(-7)}`;
    this.serviceRequests.update(items => [{ reference, type, description, status:'SUBMITTED' }, ...items]);
    return reference;
  }
}
