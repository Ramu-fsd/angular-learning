# Signals-based state

Signals are useful for synchronous application state and derived values. A `computed` signal should derive data from source signals instead of storing duplicate values.

## Banking account example

```ts
import { computed, signal } from '@angular/core';

interface Account {
  id: string;
  name: string;
  availableBalance: number;
}

const accounts = signal<Account[]>([
  { id: 'a-101', name: 'Salary Account', availableBalance: 85000 },
  { id: 'a-102', name: 'Savings Account', availableBalance: 125000 }
]);

const totalBalance = computed(() =>
  accounts().reduce((total, account) => total + account.availableBalance, 0)
);

function creditAccount(accountId: string, amount: number): void {
  if (amount <= 0) return;

  accounts.update(current =>
    current.map(account =>
      account.id === accountId
        ? { ...account, availableBalance: account.availableBalance + amount }
        : account
    )
  );
}
```

## Exercises

- Add a debit operation with insufficient-funds validation.
- Add a computed count of accounts.
- Add a selected-account signal.
- Move the state into an injectable service before sharing it across routes.
