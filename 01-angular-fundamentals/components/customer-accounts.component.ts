import { Component, signal } from '@angular/core';
import { AccountSummaryComponent } from './account-summary.component';
import { BankAccount } from '../typescript-fundamentals/account.models';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [AccountSummaryComponent],
  template: `
    <main>
      <h1>Customer accounts</h1>
      @for (account of accounts(); track account.id) {
        <app-account-summary
          [account]="account"
          (viewTransactions)="openTransactions($event)"
        />
      } @empty {
        <p>No accounts are available.</p>
      }
      @if (selectedAccountId()) {
        <p aria-live="polite">
          Selected account: {{ selectedAccountId() }}
        </p>
      }
    </main>
  `
})
export class CustomerAccountsComponent {
  readonly accounts = signal<BankAccount[]>([
    {
      id: 'acct-1001',
      maskedAccountNumber: 'XXXXXX4321',
      accountName: 'Everyday Savings',
      availableBalance: { minorUnits: 1250500, currency: 'INR' },
      status: 'ACTIVE'
    },
    {
      id: 'acct-1002',
      maskedAccountNumber: 'XXXXXX9087',
      accountName: 'Salary Account',
      availableBalance: { minorUnits: 845250, currency: 'INR' },
      status: 'ACTIVE'
    }
  ]);

  readonly selectedAccountId = signal<string | null>(null);

  openTransactions(accountId: string): void {
    this.selectedAccountId.set(accountId);
  }
}
