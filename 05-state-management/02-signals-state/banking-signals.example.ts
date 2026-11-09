import { computed, signal } from '@angular/core';

export interface Account {
  id: string;
  name: string;
  availableBalance: number;
}

export class BankingSignalsExample {
  readonly accounts = signal<Account[]>([
    { id: 'a-101', name: 'Salary Account', availableBalance: 85000 },
    { id: 'a-102', name: 'Savings Account', availableBalance: 125000 }
  ]);

  readonly totalBalance = computed(() =>
    this.accounts().reduce((sum, account) => sum + account.availableBalance, 0)
  );

  credit(accountId: string, amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) return;

    this.accounts.update(accounts =>
      accounts.map(account =>
        account.id === accountId
          ? { ...account, availableBalance: account.availableBalance + amount }
          : account
      )
    );
  }
}
