import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface Payment { id: string; beneficiary: string; amount: number; status: 'PENDING' | 'APPROVED'; }

@Component({
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <p class="eyebrow">PAYMENTS DOMAIN</p>
    <h1>Payment operations</h1>
    <p class="muted">A separate lazy-loaded feature with feature-local state.</p>
    <section class="panel">
      <table>
        <thead><tr><th>Payment reference</th><th>Beneficiary</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          @for (payment of payments(); track payment.id) {
            <tr>
              <td>{{ payment.id }}</td><td>{{ payment.beneficiary }}</td>
              <td>{{ payment.amount | currency:'INR':'symbol':'1.0-0' }}</td>
              <td><span [class.pending]="payment.status === 'PENDING'" [class.approved]="payment.status === 'APPROVED'">{{ payment.status }}</span></td>
              <td><button [disabled]="payment.status === 'APPROVED'" (click)="approve(payment.id)">Approve demo</button></td>
            </tr>
          }
        </tbody>
      </table>
    </section>
    <p class="note">Demo action only. Production payment approval requires backend authorization, maker-checker controls, audit, and idempotency.</p>
  `,
  styles: [`
    :host{display:block}.eyebrow{color:#687791;font-size:10px;font-weight:800;letter-spacing:1.4px}
    h1{margin:5px 0;color:#17243b;font-size:30px}.muted,.note{color:#7a879a;font-size:13px}
    .panel{overflow:auto;background:white;border:1px solid #e7ebf2;border-radius:12px;padding:18px;margin-top:22px}
    table{width:100%;border-collapse:collapse;text-align:left;white-space:nowrap}
    th,td{padding:13px 10px;border-bottom:1px solid #edf0f4;font-size:12px}
    th{color:#78859a;font-size:10px;text-transform:uppercase}
    button{border:0;border-radius:6px;background:#3158b7;color:white;padding:8px 10px;font-size:11px;cursor:pointer}
    button:disabled{opacity:.45;cursor:not-allowed}
    .pending,.approved{display:inline-block;border-radius:20px;padding:5px 9px;font-size:10px;font-weight:700}
    .pending{background:#fff3dc;color:#99600b}.approved{background:#e8f7ef;color:#19734e}
    .note{margin-top:14px}
  `]
})
export class PaymentsPage {
  readonly payments = signal<Payment[]>([
    { id: 'PAY-2026-0101', beneficiary: 'Metro Utilities', amount: 18400, status: 'PENDING' },
    { id: 'PAY-2026-0102', beneficiary: 'Aster Healthcare', amount: 62500, status: 'PENDING' },
    { id: 'PAY-2026-0103', beneficiary: 'Northwind Supplies', amount: 127500, status: 'APPROVED' }
  ]);
  approve(id: string): void {
    this.payments.update(items => items.map(item =>
      item.id === id ? { ...item, status: 'APPROVED' } : item
    ));
  }
}
