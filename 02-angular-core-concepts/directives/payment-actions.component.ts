import { Component, signal } from '@angular/core';
import { HasPermissionDirective } from './has-permission.directive';

@Component({
  selector: 'app-payment-actions',
  standalone: true,
  imports: [HasPermissionDirective],
  template: `
    <section>
      <h2>Payment operations</h2>
      <button
        type="button"
        [appHasPermission]="'PAYMENT_VIEW'"
        [permissions]="permissions()"
      >View payment</button>

      <button
        type="button"
        [appHasPermission]="'PAYMENT_APPROVE'"
        [permissions]="permissions()"
      >Approve payment</button>
    </section>
  `
})
export class PaymentActionsComponent {
  // Demo permissions only. In a real application these come from a trusted
  // authentication/authorization flow; the API must enforce every permission.
  readonly permissions = signal<readonly string[]>(['PAYMENT_VIEW']);
}
