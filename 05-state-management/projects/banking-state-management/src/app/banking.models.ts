export interface BankAccount {
  id: string;
  name: string;
  accountNumberMasked: string;
  balance: number;
  currency: 'INR';
}

export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'REVIEWED';

export interface BankTransaction {
  id: string;
  accountId: string;
  reference: string;
  description: string;
  date: string;
  amount: number;
  direction: 'CREDIT' | 'DEBIT';
  status: TransactionStatus;
}
