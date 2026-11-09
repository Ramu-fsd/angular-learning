import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PaymentStore } from './payment.store';
import { PaymentStatus } from './payment.models';

@Component({
  selector: 'app-payment-queue',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="intro">
      <div>
        <h2>Payment queue</h2>
        <p>Review synthetic payment instructions and their processing states.</p>
      </div>
      <div class="metric">
        <span>Pending payments</span>
        <strong>{{ store.pendingCount() }}</strong>
      </div>
    </section>
    <section class="api-check">
      <button type="button" (click)="sendDemoApiRequest()">Test correlation header</button>
      <span role="status">{{ apiMessage() }}</span>
      <small>This calls a demo endpoint that may return 404 without a backend; inspect its request headers in DevTools.</small>
    </section>

    <section class="toolbar" aria-label="Payment filters">
      <label for="status">Status</label>
      <select id="status" [value]="store.filter()" (change)="onFilterChange($event)">
        <option value="ALL">All statuses</option>
        <option value="PENDING">Pending</option>
        <option value="PROCESSING">Processing</option>
        <option value="COMPLETED">Completed</option>
        <option value="FAILED">Failed</option>
      </select>
      <label for="pageSize">Rows</label>
      <select id="pageSize" [value]="store.pageSize()" (change)="onPageSizeChange($event)">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <span class="total">Filtered total: {{ store.totalMinorUnits() / 100 | currency:'INR' }}</span>
    </section>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Payment reference</th>
            <th scope="col">Beneficiary</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          @for (payment of store.visiblePayments(); track payment.id) {
            <tr>
              <td>{{ payment.reference }}</td>
              <td>{{ payment.beneficiary }}</td>
              <td>{{ payment.amountMinorUnits / 100 | currency:payment.currency }}</td>
              <td>
                <span class="status"
                  [class.pending]="payment.status === 'PENDING'"
                  [class.processing]="payment.status === 'PROCESSING'"
                  [class.completed]="payment.status === 'COMPLETED'"
                  [class.failed]="payment.status === 'FAILED'">
                  {{ payment.status }}
                </span>
              </td>
              <td>{{ payment.createdAt | date:'medium' }}</td>
            </tr>
          } @empty {
            <tr><td colspan="5">No payments match this filter.</td></tr>
          }
        </tbody>
      </table>
    </div>

    <footer class="pagination">
      <button type="button" (click)="store.previousPage()" [disabled]="store.page() === 0">Previous</button>
      <span>Page {{ store.page() + 1 }} of {{ store.pageCount() }}</span>
      <button type="button" (click)="store.nextPage()" [disabled]="store.page() + 1 >= store.pageCount()">Next</button>
    </footer>
  `,
  styles: [`
    .intro { display:flex; justify-content:space-between; gap:1rem; align-items:center; }
    h2 { margin-bottom:.25rem; } .intro p { color:#526078; margin-top:0; }
    .metric, .toolbar, .table-wrap, .api-check { background:white; border:1px solid #dce2ea; border-radius:10px; padding:1rem; }
    .api-check { display:flex; flex-wrap:wrap; gap:.75rem; align-items:center; margin-top:1rem; }
    .api-check small { flex-basis:100%; color:#526078; }
    .metric { min-width:150px; display:grid; gap:.35rem; }
    .metric strong { font-size:1.8rem; }
    .toolbar { display:flex; flex-wrap:wrap; align-items:center; gap:.7rem; margin:1rem 0; }
    .total { margin-left:auto; font-weight:600; }
    table { border-collapse:collapse; width:100%; }
    th, td { text-align:left; padding:.8rem; border-bottom:1px solid #e8edf3; }
    th { color:#526078; font-size:.85rem; }
    .status { border-radius:99px; padding:.2rem .55rem; font-size:.78rem; font-weight:700; }
    .pending { background:#fff2cc; } .processing { background:#dbeafe; }
    .completed { background:#dcfce7; } .failed { background:#fee2e2; }
    .pagination { display:flex; justify-content:flex-end; align-items:center; gap:1rem; margin-top:1rem; }
    @media (max-width:700px) { .table-wrap { overflow-x:auto; } table { min-width:720px; } .intro { align-items:flex-start; flex-direction:column; } }
  `]
})
export class PaymentQueueComponent {
  readonly store = inject(PaymentStore);
  private readonly http = inject(HttpClient);
  readonly apiMessage = signal('');

  sendDemoApiRequest(): void {
    this.apiMessage.set('Sending demo request…');
    this.http.get('/api/demo/health').subscribe({
      next: () => this.apiMessage.set('Demo endpoint responded.'),
      error: () => this.apiMessage.set('No demo backend response expected; inspect Network request headers.')
    });
  }

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const allowed: readonly string[] = ['ALL', 'PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'];
    if (allowed.includes(value)) this.store.setFilter(value as 'ALL' | PaymentStatus);
  }

  onPageSizeChange(event: Event): void {
    this.store.setPageSize(Number((event.target as HTMLSelectElement).value));
  }
}
