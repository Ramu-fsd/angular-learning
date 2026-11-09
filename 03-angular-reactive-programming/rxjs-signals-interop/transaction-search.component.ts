import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionSearchStore } from './transaction-search.store';

@Component({
  selector: 'app-transaction-search-signal',
  standalone: true,
  imports: [FormsModule],
  providers: [TransactionSearchStore],
  template: `
    <h2>Transaction search</h2>
    <input
      aria-label="Search transactions"
      [ngModel]="store.query()"
      (ngModelChange)="store.query.set($event)"
      placeholder="Enter reference or beneficiary"
    />

    @for (result of store.results(); track result.id) {
      <article>{{ result.maskedReference }} — {{ result.status }}</article>
    } @empty {
      <p>No matching transactions.</p>
    }
  `
})
export class TransactionSearchSignalComponent {
  readonly store = inject(TransactionSearchStore);
}
