import { Injectable, computed, signal } from '@angular/core';
import { AccountStatus, AccountType, BankAccount } from './account.models';

const seedAccounts: BankAccount[] = [
  {
    id: 'AC-1001', accountNumber: '**** 4821', customer: 'Ananya Rao',
    type: 'Savings', currency: 'INR', ledgerBalance: 485000, availableBalance: 472500,
    status: 'Active', branch: 'Hyderabad - Banjara Hills', openedOn: '2021-04-12',
    transactions: [
      { id: 'TX-9001', date: '2026-11-09T10:30:00', description: 'Salary credit', category: 'Income', amount: 125000, direction: 'Credit', status: 'Completed' },
      { id: 'TX-9002', date: '2026-11-08T16:20:00', description: 'Utility bill payment', category: 'Bills', amount: 4200, direction: 'Debit', status: 'Completed' },
      { id: 'TX-9003', date: '2026-11-07T12:10:00', description: 'Online transfer', category: 'Transfer', amount: 8500, direction: 'Debit', status: 'Completed' }
    ]
  },
  {
    id: 'AC-1002', accountNumber: '**** 1936', customer: 'Vikram Mehta',
    type: 'Current', currency: 'INR', ledgerBalance: 2450000, availableBalance: 2390000,
    status: 'Active', branch: 'Mumbai - Fort', openedOn: '2019-09-03',
    transactions: [
      { id: 'TX-9011', date: '2026-11-09T09:15:00', description: 'Merchant settlement', category: 'Settlement', amount: 285000, direction: 'Credit', status: 'Completed' },
      { id: 'TX-9012', date: '2026-11-08T14:45:00', description: 'Vendor payment', category: 'Payment', amount: 64000, direction: 'Debit', status: 'Pending' }
    ]
  },
  {
    id: 'AC-1003', accountNumber: '**** 7504', customer: 'Meera Iyer',
    type: 'Fixed Deposit', currency: 'INR', ledgerBalance: 1000000, availableBalance: 1000000,
    status: 'Active', branch: 'Chennai - T Nagar', openedOn: '2024-01-20',
    transactions: [
      { id: 'TX-9021', date: '2026-10-20T11:00:00', description: 'Quarterly interest', category: 'Interest', amount: 18750, direction: 'Credit', status: 'Completed' }
    ]
  },
  {
    id: 'AC-1004', accountNumber: '**** 6629', customer: 'Rahul Verma',
    type: 'Savings', currency: 'INR', ledgerBalance: 78500, availableBalance: 78500,
    status: 'Dormant', branch: 'Pune - Shivaji Nagar', openedOn: '2017-06-18',
    transactions: [
      { id: 'TX-9031', date: '2025-12-01T10:00:00', description: 'Interest credit', category: 'Interest', amount: 450, direction: 'Credit', status: 'Completed' }
    ]
  },
  {
    id: 'AC-1005', accountNumber: '**** 8102', customer: 'Sana Khan',
    type: 'Current', currency: 'INR', ledgerBalance: 650000, availableBalance: 0,
    status: 'Blocked', branch: 'Bengaluru - MG Road', openedOn: '2022-02-11',
    transactions: []
  }
];

@Injectable({ providedIn: 'root' })
export class AccountsService {
  readonly accounts = signal<BankAccount[]>(seedAccounts);
  readonly totalAccounts = computed(() => this.accounts().length);
  readonly activeAccounts = computed(() => this.accounts().filter((a) => a.status === 'Active').length);
  readonly totalBalance = computed(() => this.accounts().reduce((sum, account) => sum + account.ledgerBalance, 0));

  getById(id: string): BankAccount | undefined {
    return this.accounts().find((account) => account.id === id);
  }

  search(query: string, type: string, status: string): BankAccount[] {
    const term = query.trim().toLowerCase();
    return this.accounts().filter((account) => {
      const matchesText = [account.id, account.accountNumber, account.customer, account.branch].join(' ').toLowerCase().includes(term);
      return matchesText && (type === 'All' || account.type === type) && (status === 'All' || account.status === status);
    });
  }

  readonly accountTypes: AccountType[] = ['Current', 'Savings', 'Fixed Deposit'];
  readonly accountStatuses: AccountStatus[] = ['Active', 'Dormant', 'Blocked'];
}
