import { Injectable, computed, signal } from '@angular/core';
import { PaymentRecord, PaymentStatus } from './payment.models';

@Injectable({ providedIn: 'root' })
export class PaymentStore {
  private readonly allPayments = signal<readonly PaymentRecord[]>([
    { id: 'p-501', reference: 'PAY-500501', beneficiary: 'A. Sharma · XXXX1234', amountMinorUnits: 125050, currency: 'INR', status: 'PENDING', createdAt: '2026-11-09T09:15:00Z' },
    { id: 'p-502', reference: 'PAY-500502', beneficiary: 'M. Rao · XXXX9088', amountMinorUnits: 780000, currency: 'INR', status: 'PROCESSING', createdAt: '2026-11-09T09:20:00Z' },
    { id: 'p-503', reference: 'PAY-500503', beneficiary: 'K. Iyer · XXXX4421', amountMinorUnits: 450050, currency: 'INR', status: 'COMPLETED', createdAt: '2026-11-09T09:25:00Z' },
    { id: 'p-504', reference: 'PAY-500504', beneficiary: 'S. Khan · XXXX7712', amountMinorUnits: 99000, currency: 'INR', status: 'FAILED', createdAt: '2026-11-09T09:30:00Z' },
    { id: 'p-505', reference: 'PAY-500505', beneficiary: 'R. Das · XXXX3377', amountMinorUnits: 250000, currency: 'INR', status: 'PENDING', createdAt: '2026-11-09T09:35:00Z' },
    { id: 'p-506', reference: 'PAY-500506', beneficiary: 'P. Nair · XXXX6655', amountMinorUnits: 310000, currency: 'INR', status: 'COMPLETED', createdAt: '2026-11-09T09:40:00Z' }
  ]);

  readonly filter = signal<'ALL' | PaymentStatus>('ALL');
  readonly page = signal(0);
  readonly pageSize = signal(5);

  readonly filteredPayments = computed(() => {
    const selected = this.filter();
    return selected === 'ALL'
      ? this.allPayments()
      : this.allPayments().filter((payment) => payment.status === selected);
  });

  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.filteredPayments().length / this.pageSize()))
  );

  readonly visiblePayments = computed(() => {
    const start = this.page() * this.pageSize();
    return this.filteredPayments().slice(start, start + this.pageSize());
  });

  readonly pendingCount = computed(() =>
    this.allPayments().filter((payment) => payment.status === 'PENDING').length
  );

  readonly totalMinorUnits = computed(() =>
    this.filteredPayments().reduce((sum, payment) => sum + payment.amountMinorUnits, 0)
  );

  setFilter(value: 'ALL' | PaymentStatus): void {
    this.filter.set(value);
    this.page.set(0);
  }

  setPageSize(value: number): void {
    if ([5, 10, 20].includes(value)) {
      this.pageSize.set(value);
      this.page.set(0);
    }
  }

  previousPage(): void {
    this.page.update((value) => Math.max(0, value - 1));
  }

  nextPage(): void {
    this.page.update((value) => Math.min(this.pageCount() - 1, value + 1));
  }
}
