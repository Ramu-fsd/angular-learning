import { Component, ViewContainerRef, inject } from '@angular/core';
import { PaymentDetailComponent } from './payment-detail.component';

@Component({
  selector: 'app-payment-detail-host',
  standalone: true,
  template: `
    <h2>Selected payment</h2>
    <button type="button" (click)="showDetails()">Show demo details</button>
    <ng-container #detailHost />
  `
})
export class PaymentDetailHostComponent {
  private readonly viewContainer = inject(ViewContainerRef);

  showDetails(): void {
    this.viewContainer.clear();

    const componentRef = this.viewContainer.createComponent(PaymentDetailComponent);
    componentRef.setInput('reference', 'PAY-400501');
    componentRef.setInput('status', 'PENDING_REVIEW');
  }
}
