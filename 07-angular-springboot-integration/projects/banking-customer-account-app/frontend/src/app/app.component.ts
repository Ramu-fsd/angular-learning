import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingApiService } from './banking-api.service';
import { BankAccount, Customer } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  template: `
    <main class="shell">
      <header class="header">
        <div>
          <p class="eyebrow">BANKING PLATFORM · CUSTOMER SERVICING</p>
          <h1>Customer & Account Management</h1>
          <p class="subtitle">Angular frontend connected to Spring Boot REST APIs</p>
        </div>
        <span class="environment">LOCAL DEMO</span>
      </header>

      @if (errorMessage) {
        <div class="alert error" role="alert">{{ errorMessage }}</div>
      }
      @if (successMessage) {
        <div class="alert success" role="status">{{ successMessage }}</div>
      }

      <section class="metrics">
        <article><span>Total customers</span><strong>{{ customers.length }}</strong></article>
        <article><span>Total accounts</span><strong>{{ accounts.length }}</strong></article>
        <article><span>Combined demo balance</span><strong>{{ totalBalance | currency:'INR':'symbol':'1.0-0' }}</strong></article>
      </section>

      <section class="forms">
        <article class="panel">
          <h2>Onboard customer</h2>
          <form (ngSubmit)="createCustomer()">
            <label>Full name
              <input name="fullName" [(ngModel)]="customerForm.fullName" required maxlength="120" />
            </label>
            <label>Email address
              <input name="email" type="email" [(ngModel)]="customerForm.email" required maxlength="180" />
            </label>
            <button [disabled]="busy || !customerForm.fullName.trim() || !isEmailValid(customerForm.email)">
              {{ busy ? 'Please wait…' : 'Create customer' }}
            </button>
          </form>
        </article>

        <article class="panel">
          <h2>Open bank account</h2>
          <form (ngSubmit)="createAccount()">
            <label>Customer
              <select name="customerId" [(ngModel)]="accountForm.customerId" required>
                <option [ngValue]="0">Select customer</option>
                @for (customer of customers; track customer.id) {
                  <option [ngValue]="customer.id">{{ customer.fullName }} ({{ customer.id }})</option>
                }
              </select>
            </label>
            <label>Account number
              <input name="accountNumber" [(ngModel)]="accountForm.accountNumber" required maxlength="24" />
            </label>
            <div class="inline-fields">
              <label>Type
                <select name="accountType" [(ngModel)]="accountForm.accountType">
                  <option value="SAVINGS">Savings</option>
                  <option value="CURRENT">Current</option>
                </select>
              </label>
              <label>Opening balance
                <input name="availableBalance" type="number" min="0" step="0.01" [(ngModel)]="accountForm.availableBalance" />
              </label>
            </div>
            <button [disabled]="busy || !accountForm.customerId || !accountForm.accountNumber.trim() || accountForm.availableBalance < 0">
              Create account
            </button>
          </form>
        </article>
      </section>

      <section class="panel data-panel">
        <div class="section-heading"><div><p class="eyebrow">CUSTOMER DIRECTORY</p><h2>Customers</h2></div></div>
        @if (loading) { <p class="muted">Loading customers…</p> }
        @else if (customers.length === 0) { <p class="muted">No customers found. Create the first customer above.</p> }
        @else {
          <div class="table-wrap"><table>
            <thead><tr><th>ID</th><th>Customer</th><th>Email</th></tr></thead>
            <tbody>
              @for (customer of customers; track customer.id) {
                <tr><td>{{ customer.id }}</td><td>{{ customer.fullName }}</td><td>{{ customer.email }}</td></tr>
              }
            </tbody>
          </table></div>
        }
      </section>

      <section class="panel data-panel">
        <div class="section-heading"><div><p class="eyebrow">DEPOSIT ACCOUNTS</p><h2>Accounts</h2></div></div>
        @if (accounts.length === 0) { <p class="muted">No accounts found.</p> }
        @else {
          <div class="table-wrap"><table>
            <thead><tr><th>ID</th><th>Account number</th><th>Type</th><th>Customer ID</th><th>Available balance</th></tr></thead>
            <tbody>
              @for (account of accounts; track account.id) {
                <tr><td>{{ account.id }}</td><td>{{ account.accountNumber }}</td><td>{{ account.accountType }}</td><td>{{ account.customerId }}</td><td>{{ account.availableBalance | currency:'INR':'symbol':'1.2-2' }}</td></tr>
              }
            </tbody>
          </table></div>
        }
      </section>

      <footer>Learning project · Synthetic data only · Backend is the source of truth</footer>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly api = inject(BankingApiService);

  customers: Customer[] = [];
  accounts: BankAccount[] = [];
  loading = false;
  busy = false;
  errorMessage = '';
  successMessage = '';

  customerForm = { fullName: '', email: '' };
  accountForm: {
    customerId: number;
    accountNumber: string;
    accountType: 'SAVINGS' | 'CURRENT';
    availableBalance: number;
  } = { customerId: 0, accountNumber: '', accountType: 'SAVINGS', availableBalance: 0 };

  get totalBalance(): number {
    return this.accounts.reduce((sum, account) => sum + Number(account.availableBalance), 0);
  }

  ngOnInit(): void {
    this.refresh();
  }

  isEmailValid(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  refresh(): void {
    this.loading = true;
    this.errorMessage = '';
    this.api.getCustomers().subscribe({
      next: customers => {
        this.customers = customers;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Could not load customers. Confirm that the Spring Boot API is running.';
      }
    });
    this.api.getAccounts().subscribe({
      next: accounts => this.accounts = accounts,
      error: () => this.errorMessage = 'Could not load accounts. Confirm that the Spring Boot API is running.'
    });
  }

  createCustomer(): void {
    this.busy = true;
    this.clearMessages();
    this.api.createCustomer({
      fullName: this.customerForm.fullName.trim(),
      email: this.customerForm.email.trim()
    }).subscribe({
      next: customer => {
        this.customers = [...this.customers, customer];
        this.customerForm = { fullName: '', email: '' };
        this.successMessage = `Customer ${customer.fullName} created successfully.`;
        this.busy = false;
      },
      error: error => {
        this.errorMessage = this.readError(error);
        this.busy = false;
      }
    });
  }

  createAccount(): void {
    this.busy = true;
    this.clearMessages();
    this.api.createAccount({
      customerId: Number(this.accountForm.customerId),
      accountNumber: this.accountForm.accountNumber.trim(),
      accountType: this.accountForm.accountType,
      availableBalance: Number(this.accountForm.availableBalance)
    }).subscribe({
      next: account => {
        this.accounts = [account, ...this.accounts];
        this.accountForm = { customerId: 0, accountNumber: '', accountType: 'SAVINGS', availableBalance: 0 };
        this.successMessage = `Account ${account.accountNumber} created successfully.`;
        this.busy = false;
      },
      error: error => {
        this.errorMessage = this.readError(error);
        this.busy = false;
      }
    });
  }

  private readError(error: any): string {
    const body = error?.error;
    if (body?.fieldErrors) {
      return Object.entries(body.fieldErrors)
        .map(([field, message]) => `${field}: ${message}`)
        .join(' · ');
    }
    return body?.message || 'The request failed. Please check the values and try again.';
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
