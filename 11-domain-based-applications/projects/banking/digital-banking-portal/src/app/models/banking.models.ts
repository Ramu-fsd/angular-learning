export interface BankAccount {
  accountId: string;
  displayName: string;
  maskedNumber: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'INVESTMENT';
  currency: string;
  availableBalance: number;
}

export interface BankTransaction {
  transactionId: string;
  accountId: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  status: 'POSTED' | 'PENDING';
}

export interface Beneficiary {
  id: string;
  name: string;
  bankName: string;
  maskedAccount: string;
  status: 'ACTIVE' | 'PENDING_VERIFICATION';
}

export interface ServiceRequest {
  reference: string;
  type: string;
  description: string;
  status: 'SUBMITTED';
}
