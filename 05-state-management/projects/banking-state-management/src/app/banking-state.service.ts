import { Injectable, computed, signal } from '@angular/core';
import { BankAccount, BankTransaction, TransactionStatus } from './banking.models';

@Injectable({ providedIn: 'root' })
export class BankingStateService {
  readonly accounts = signal<BankAccount[]>([
    { id: 'acc-001', name: 'Salary Account', accountNumberMasked: 'XXXXXX4821', balance: 185000, currency: 'INR' },
    { id: 'acc-002', name: 'Savings Account', accountNumberMasked: 'XXXXXX9174', balance: 325000, currency: 'INR' },
    { id: 'acc-003', name: 'Business Account', accountNumberMasked: 'XXXXXX2065', balance: 740000, currency: 'INR' }
  ]);

  readonly transactions = signal<BankTransaction[]>([
    { id: 'txn-001', accountId: 'acc-001', reference: 'NEFT-260901', description: 'Salary credit - Acme Technologies', date: '2026-11-01', amount: 125000, direction: 'CREDIT', status: 'COMPLETED' },
    { id: 'txn-002', accountId: 'acc-001', reference: 'UPI-260902', description: 'Utility bill payment', date: '2026-11-02', amount: 4200, direction: 'DEBIT', status: 'PENDING' },
    { id: 'txn-003', accountId: 'acc-001', reference: 'POS-260903', description: 'Grocery purchase', date: '2026-11-03', amount: 2850, direction: 'DEBIT', status: 'COMPLETED' },
    { id: 'txn-004', accountId: 'acc-002', reference: 'IMPS-260904', description: 'Transfer from salary account', date: '2026-11-04', amount: 30000, direction: 'CREDIT', status: 'COMPLETED' },
    { id: 'txn-005', accountId: 'acc-002', reference: 'BILL-260905', description: 'Credit card bill', date: '2026-11-05', amount: 18400, direction: 'DEBIT', status: 'PENDING' },
    { id: 'txn-006', accountId: 'acc-003', reference: 'RTGS-260906', description: 'Vendor settlement', date: '2026-11-06', amount: 215000, direction: 'DEBIT', status: 'COMPLETED' },
    { id: 'txn-007', accountId: 'acc-003', reference: 'NEFT-260907', description: 'Customer invoice settlement', date: '2026-11-07', amount: 98000, direction: 'CREDIT', status: 'PENDING' }
  ]);

  readonly selectedAccountId = signal('acc-001');
  readonly searchTerm = signal('');
  readonly statusFilter = signal<'ALL' | TransactionStatus>('ALL');
  readonly selectedTransactionId = signal<string | null>(null);

  readonly totalBalance = computed(() =>
    this.accounts().reduce((sum, account) => sum + account.balance, 0)
  );

  readonly pendingCount = computed(() =>
    this.transactions().filter(txn => txn.status === 'PENDING').length
  );

  readonly selectedAccount = computed(() =>
    this.accounts().find(account => account.id === this.selectedAccountId()) ?? null
  );

  readonly filteredTransactions = computed(() => {
    const accountId = this.selectedAccountId();
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();

    return this.transactions()
      .filter(txn => txn.accountId === accountId)
      .filter(txn => status === 'ALL' || txn.status === status)
      .filter(txn =>
        !term ||
        txn.description.toLowerCase().includes(term) ||
        txn.reference.toLowerCase().includes(term)
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  });

  selectAccount(accountId: string): void {
    if (this.accounts().some(account => account.id === accountId)) {
      this.selectedAccountId.set(accountId);
      this.selectedTransactionId.set(null);
    }
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  setStatusFilter(value: 'ALL' | TransactionStatus): void {
    this.statusFilter.set(value);
  }

  selectTransaction(transactionId: string): void {
    this.selectedTransactionId.set(transactionId);
  }

  markSelectedAsReviewed(): void {
    const selectedId = this.selectedTransactionId();
    if (!selectedId) return;

    this.transactions.update(items =>
      items.map(txn =>
        txn.id === selectedId && txn.status === 'PENDING'
          ? { ...txn, status: 'REVIEWED' }
          : txn
      )
    );
  }
}
