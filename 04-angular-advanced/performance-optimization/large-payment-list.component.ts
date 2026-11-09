import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface PaymentRow {
  readonly id: string;
  readonly reference: string;
  readonly status: 'PENDING' | 'COMPLETED' | 'FAILED';
  readonly amountMinorUnits: number;
}

@Component({
  selector: 'app-large-payment-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Payment records</h2>
    <label for="pageSize">Rows per page</label>
    <select id="pageSize" [value]="pageSize()" (change)="changePageSize($event)">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>

    @for (payment of visiblePayments(); track payment.id) {
      <article>
        {{ payment.reference }} — {{ payment.status }}
      </article>
    }

    <button type="button" (click)="previousPage()" [disabled]="page() === 0">Previous</button>
    <span>Page {{ page() + 1 }} of {{ pageCount() }}</span>
    <button type="button" (click)="nextPage()" [disabled]="page() + 1 >= pageCount()">Next</button>
  `
})
export class LargePaymentListComponent {
  readonly rows = signal<readonly PaymentRow[]>(
    Array.from({ length: 250 }, (_, index) => ({
      id: `payment-${index + 1}`,
      reference: `PAY-${String(300001 + index)}`,
      status: index % 5 === 0 ? 'PENDING' : index % 7 === 0 ? 'FAILED' : 'COMPLETED',
      amountMinorUnits: 10000 + index * 137
    }))
  );

  readonly page = signal(0);
  readonly pageSize = signal(25);
  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.rows().length / this.pageSize()))
  );
  readonly visiblePayments = computed(() => {
    const start = this.page() * this.pageSize();
    return this.rows().slice(start, start + this.pageSize());
  });

  changePageSize(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if ([10, 25, 50].includes(value)) {
      this.pageSize.set(value);
      this.page.set(0);
    }
  }

  previousPage(): void {
    this.page.update((current) => Math.max(0, current - 1));
  }

  nextPage(): void {
    this.page.update((current) => Math.min(this.pageCount() - 1, current + 1));
  }
}
