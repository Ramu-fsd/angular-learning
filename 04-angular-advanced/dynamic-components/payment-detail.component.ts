import { Component, input } from '@angular/core';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  template: `
    <aside>
      <h3>Payment details</h3>
      <p>Reference: {{ reference() }}</p>
      <p>Status: {{ status() }}</p>
    </aside>
  `
})
export class PaymentDetailComponent {
  readonly reference = input.required<string>();
  readonly status = input.required<string>();
}
