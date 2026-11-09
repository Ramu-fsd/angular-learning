import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-draft',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="reviewPayment()">
      <label for="beneficiary">Beneficiary</label>
      <select
        id="beneficiary"
        name="beneficiary"
        [(ngModel)]="beneficiaryId"
        required
      >
        <option value="">Choose a beneficiary</option>
        <option value="ben-101">A. Sharma — XXXX1234</option>
        <option value="ben-102">M. Rao — XXXX9088</option>
      </select>

      <label for="amount">Amount (INR)</label>
      <input
        id="amount"
        name="amount"
        type="number"
        min="1"
        step="0.01"
        [(ngModel)]="amount"
        required
      />

      <button
        type="submit"
        [disabled]="!beneficiaryId || amount <= 0"
      >
        Review payment
      </button>
    </form>

    @if (reviewMessage()) {
      <p role="status">{{ reviewMessage() }}</p>
    }
  `
})
export class PaymentDraftComponent {
  beneficiaryId = '';
  amount = 0;
  readonly reviewMessage = signal('');

  reviewPayment(): void {
    // Demonstration only: do not initiate a real payment from this example.
    this.reviewMessage.set(
      `Draft ready for beneficiary ${this.beneficiaryId}; amount INR ${this.amount.toFixed(2)}.`
    );
  }
}
