import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { TransactionHistoryService, TransactionHistoryPage } from './transaction-history.service';

@Component({
  selector: 'app-history-panel',
  standalone: true,
  template: `
    <h2>Account transaction history</h2>
    <button type="button" (click)="refresh()" [disabled]="loading()">Refresh</button>
    @if (loading()) { <p role="status">Loading…</p> }
    @if (errorMessage()) { <p role="alert">{{ errorMessage() }}</p> }
    @if (page(); as history) {
      <p>Total transactions: {{ history.totalElements }}</p>
      @for (transaction of history.content; track transaction.id) {
        <p>{{ transaction.maskedReference }} — {{ transaction.status }}</p>
      }
    }
  `
})
export class HistoryPanelComponent {
  private readonly historyService = inject(TransactionHistoryService);
  private readonly destroyRef = inject(DestroyRef);

  readonly page = signal<TransactionHistoryPage | null>(null);
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  refresh(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.historyService.getHistory('acct-demo-1001').pipe(
      finalize(() => this.loading.set(false)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (page) => this.page.set(page),
      error: () => this.errorMessage.set('Could not load transaction history. Please retry.')
    });
  }
}
