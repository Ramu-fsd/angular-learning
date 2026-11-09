export type CurrencyCode = 'INR' | 'USD' | 'EUR';

export type AccountStatus = 'ACTIVE' | 'FROZEN' | 'CLOSED';

export interface Money {
  /** Integer minor units: 125050 means INR 1,250.50. */
  readonly minorUnits: number;
  readonly currency: CurrencyCode;
}

export interface BankAccount {
  readonly id: string;
  readonly maskedAccountNumber: string;
  readonly accountName: string;
  readonly availableBalance: Money;
  readonly status: AccountStatus;
}

export type TransactionStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REVERSED';

export interface BankTransaction {
  readonly id: string;
  readonly description: string;
  readonly amount: Money;
  readonly status: TransactionStatus;
  readonly bookedAt: string; // ISO-8601 timestamp from the API
}

export interface Beneficiary {
  readonly id: string;
  readonly displayName: string;
  readonly maskedAccountReference: string;
  readonly active: boolean;
}
