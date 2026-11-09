import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError, debounceTime, distinctUntilChanged, of, startWith, switchMap
} from 'rxjs';

interface TransactionSummary {
  readonly id: string;
  readonly maskedReference: string;
  readonly status: string;
  readonly amountMinorUnits: number;
}

@Component({
  selector: 'app-transaction-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Transaction search</h2>
    <label for="query">Search by reference or beneficiary</label>
    <input id="query" [formControl]="query" placeholder="Enter at least 3 characters" />

    @if (loading()) {
      <p role="status">Searching…</p>
    }
    @if (errorMessage()) {
      <p role="alert">{{ errorMessage() }}</p>
    }
    @for (item of results(); track item.id) {
      <article>
        {{ item.maskedReference }} — {{ item.status }}
      </article>
    } @empty {
      @if (!loading()) {
        <p>No matching transactions.</p>
      }
    }
  `
})
export class TransactionSearchComponent {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly query = new FormControl('', { nonNullable: true });
  readonly results = signal<readonly TransactionSummary[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  constructor() {
    this.query.valueChanges.pipe(
      startWith(this.query.value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        const normalized = term.trim();
        if (normalized.length < 3) {
          this.loading.set(false);
          this.errorMessage.set('');
          return of<readonly TransactionSummary[]>([]);
        }

        this.loading.set(true);
        this.errorMessage.set('');

        return this.http.get<readonly TransactionSummary[]>('/api/transactions', {
          params: { query: normalized }
        }).pipe(
          catchError(() => {
            this.errorMessage.set('Transaction search is temporarily unavailable.');
            return of<readonly TransactionSummary[]>([]);
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((items) => {
      this.results.set(items);
      this.loading.set(false);
    });
  }
}
