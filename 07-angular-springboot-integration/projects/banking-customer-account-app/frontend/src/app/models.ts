export interface Customer {
  id: number;
  fullName: string;
  email: string;
}

export interface BankAccount {
  id: number;
  accountNumber: string;
  accountType: string;
  availableBalance: number;
  customerId: number;
}

export interface CreateCustomerRequest {
  fullName: string;
  email: string;
}

export interface CreateAccountRequest {
  accountNumber: string;
  accountType: 'SAVINGS' | 'CURRENT';
  availableBalance: number;
  customerId: number;
}
