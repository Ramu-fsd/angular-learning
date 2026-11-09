import { Component, inject, signal } from '@angular/core';
import { AccountApiService } from './account-api.service';
import { BankAccount } from '../typescript-fundamentals/account.models';

@Component({
  selector: 'app-account-overview',
  standalone: true,
  template: `
    <h1>Account overview</h1>
    @if (loading()) {
      <p role="status">Loading accounts…</p>
    } @else if (error()) {
      <p role="alert">{{ error() }}</p>
    } @else {
      @for (account of accounts(); track account.id) {
        <p>{{ account.accountName }} — {{ account.maskedAccountNumber }}</p>
      } @empty {
        <p>No accounts found.</p>
      }
    }
  `
})
export class AccountOverviewComponent {
  private readonly accountApi = inject(AccountApiService);

  readonly accounts = signal<BankAccount[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor() {
    this.accountApi.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Accounts could not be loaded. Please try again later.');
        this.loading.set(false);
      }
    });
  }
}
