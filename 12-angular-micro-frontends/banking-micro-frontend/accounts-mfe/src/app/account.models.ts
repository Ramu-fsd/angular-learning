export type AccountType = 'Current' | 'Savings' | 'Fixed Deposit';
export type AccountStatus = 'Active' | 'Dormant' | 'Blocked';

export interface AccountTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  direction: 'Credit' | 'Debit';
  status: 'Completed' | 'Pending';
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  customer: string;
  type: AccountType;
  currency: string;
  ledgerBalance: number;
  availableBalance: number;
  status: AccountStatus;
  branch: string;
  openedOn: string;
  transactions: AccountTransaction[];
}
