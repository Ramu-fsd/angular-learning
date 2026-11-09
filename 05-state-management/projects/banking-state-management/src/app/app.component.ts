import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { BankingStateService } from './banking-state.service';
import { TransactionStatus } from './banking.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass],
  template: `
    <main class="page-shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">RETAIL BANKING · OPERATIONS</p>
          <h1>Banking overview</h1>
          <p class="muted">Account activity and transaction review workspace</p>
        </div>
        <div class="avatar">RB</div>
      </header>

      <section class="summary-grid" aria-label="Account summary">
        <article class="summary-card">
          <span class="summary-label">Total relationship balance</span>
          <strong>{{ state.totalBalance() | currency:'INR':'symbol':'1.0-0' }}</strong>
          <small>Across {{ state.accounts().length }} accounts</small>
        </article>
        <article class="summary-card">
          <span class="summary-label">Accounts</span>
          <strong>{{ state.accounts().length }}</strong>
          <small>Active demo accounts</small>
        </article>
        <article class="summary-card">
          <span class="summary-label">Pending transactions</span>
          <strong>{{ state.pendingCount() }}</strong>
          <small>Awaiting review</small>
        </article>
      </section>

      <section class="workspace">
        <aside class="panel accounts-panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">PORTFOLIO</p>
              <h2>My accounts</h2>
            </div>
          </div>

          @for (account of state.accounts(); track account.id) {
            <button class="account-item"
                    [class.active]="state.selectedAccountId() === account.id"
                    (click)="state.selectAccount(account.id)">
              <span class="account-icon">₹</span>
              <span class="account-details">
                <strong>{{ account.name }}</strong>
                <small>{{ account.accountNumberMasked }}</small>
                <b>{{ account.balance | currency:'INR':'symbol':'1.0-0' }}</b>
              </span>
              <span class="chevron">›</span>
            </button>
          }
        </aside>

        <section class="panel activity-panel">
          <div class="activity-heading">
            <div>
              <p class="eyebrow">ACCOUNT ACTIVITY</p>
              <h2>{{ state.selectedAccount()?.name }}</h2>
              <p class="muted">{{ state.selectedAccount()?.accountNumberMasked }}</p>
            </div>
            <span class="balance-pill">
              {{ state.selectedAccount()?.balance | currency:'INR':'symbol':'1.0-0' }}
            </span>
          </div>

          <div class="toolbar">
            <input
              type="search"
              placeholder="Search description or reference"
              aria-label="Search transactions"
              (input)="onSearch($event)" />
            <select aria-label="Filter by status" (change)="onFilter($event)">
              <option value="ALL">All statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWED">Reviewed</option>
            </select>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                @for (txn of state.filteredTransactions(); track txn.id) {
                  <tr [class.selected]="state.selectedTransactionId() === txn.id"
                      (click)="state.selectTransaction(txn.id)">
                    <td>
                      <strong>{{ txn.description }}</strong>
                      <small>{{ txn.direction }}</small>
                    </td>
                    <td>{{ txn.date | date:'dd MMM yyyy' }}</td>
                    <td class="reference">{{ txn.reference }}</td>
                    <td [class.credit]="txn.direction === 'CREDIT'">
                      {{ txn.direction === 'CREDIT' ? '+' : '−' }}{{ txn.amount | currency:'INR':'symbol':'1.0-0' }}
                    </td>
                    <td>
                      <span class="status" [ngClass]="statusClass(txn.status)">
                        {{ txn.status }}
                      </span>
                    </td>
                  </tr>
                } @empty {
                  <tr><td colspan="5" class="empty">No transactions match your filters.</td></tr>
                }
              </tbody>
            </table>
          </div>

          <footer class="table-footer">
            <span class="muted">{{ state.filteredTransactions().length }} transaction(s) shown</span>
            <button class="primary-button"
                    [disabled]="!canReviewSelected()"
                    (click)="state.markSelectedAsReviewed()">
              Mark selected as reviewed
            </button>
          </footer>
          <p class="hint">Select a pending transaction row before marking it as reviewed.</p>
        </section>
      </section>

      <footer class="app-footer">
        <span>Learning demo · In-memory sample data</span>
        <span>State powered by Angular Signals</span>
      </footer>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly state = inject(BankingStateService);

  onSearch(event: Event): void {
    this.state.setSearchTerm((event.target as HTMLInputElement).value);
  }

  onFilter(event: Event): void {
    this.state.setStatusFilter((event.target as HTMLSelectElement).value as 'ALL' | TransactionStatus);
  }

  canReviewSelected(): boolean {
    const selectedId = this.state.selectedTransactionId();
    return !!selectedId && this.state.transactions().some(
      txn => txn.id === selectedId && txn.status === 'PENDING'
    );
  }

  statusClass(status: TransactionStatus): string {
    return status.toLowerCase();
  }
}
