import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PaymentStateService } from './payment-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <main class="shell">
      <header>
        <div><p class="eyebrow">PAYMENTS · OPERATIONS CONTROL</p><h1>Payment Review Console</h1><p class="muted">Review and approve outgoing payment instructions</p></div>
        <span class="demo">TESTING DEMO</span>
      </header>
      <section class="summary">
        <article><span>Total instructions</span><strong>{{ state.payments().length }}</strong></article>
        <article><span>Pending review</span><strong>{{ state.pendingCount() }}</strong></article>
      </section>
      <section class="panel">
        <div class="toolbar">
          <div><h2>Payment queue</h2><p class="muted">Select a pending payment to approve it</p></div>
          <input aria-label="Search payments" placeholder="Search reference or beneficiary" (input)="search($event)" />
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Reference</th><th>Beneficiary</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              @for (payment of filtered(); track payment.id) {
                <tr>
                  <td>{{ payment.reference }}</td><td>{{ payment.beneficiary }}</td>
                  <td>{{ payment.amount | currency:'INR':'symbol':'1.0-0' }}</td>
                  <td><span class="status" [class.pending]="payment.status === 'PENDING'" [class.approved]="payment.status === 'APPROVED'">{{ payment.status }}</span></td>
                  <td><button [disabled]="payment.status === 'APPROVED'" (click)="approve(payment.id)">Approve</button></td>
                </tr>
              } @empty { <tr><td colspan="5" class="empty">No matching payments.</td></tr> }
            </tbody>
          </table>
        </div>
      </section>
      <footer>In-memory sample data · Production approval must be authorized and audited by the backend</footer>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly state = inject(PaymentStateService);
  readonly term = signal('');
  readonly filtered = computed(() => {
    const value = this.term().trim().toLowerCase();
    return this.state.payments().filter(payment =>
      `${payment.reference} ${payment.beneficiary}`.toLowerCase().includes(value)
    );
  });

  search(event: Event): void {
    this.term.set((event.target as HTMLInputElement).value);
  }

  approve(id: string): void {
    this.state.approve(id);
  }
}
