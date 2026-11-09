import { Component, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { BankTransaction } from '../typescript-fundamentals/account.models';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  template: `
    <section aria-labelledby="recent-transactions-title">
      <h2 id="recent-transactions-title">Recent transactions</h2>

      @if (loading()) {
        <p role="status">Loading recent transactions…</p>
      } @else {
        @for (transaction of transactions(); track transaction.id) {
          <article>
            <h3>{{ transaction.description }}</h3>
            <p>
              {{ transaction.amount.minorUnits / 100 | number:'1.2-2' }}
              {{ transaction.amount.currency }}
            </p>
            <time [attr.datetime]="transaction.bookedAt">
              {{ transaction.bookedAt | date:'medium' }}
            </time>
            @switch (transaction.status) {
              @case ('COMPLETED') { <span>Completed</span> }
              @case ('PENDING') { <span>Pending</span> }
              @case ('FAILED') { <span>Failed</span> }
              @case ('REVERSED') { <span>Reversed</span> }
            }
          </article>
        } @empty {
          <p>No transactions found for this account.</p>
        }
      }
    </section>
  `
})
export class TransactionListComponent {
  readonly transactions = input.required<BankTransaction[]>();
  readonly loading = input(false);
}
