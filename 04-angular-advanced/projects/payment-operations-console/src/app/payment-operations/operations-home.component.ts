import { Component } from '@angular/core';

@Component({
  selector: 'app-operations-home',
  standalone: true,
  template: `
    <section class="panel">
      <h2>Operations workspace</h2>
      <p>You reached this route through the demo authentication guard.</p>
      <p>This is a navigation demonstration only. No real payment approval or reversal is performed.</p>
      <h3>Enterprise controls to add</h3>
      <ul>
        <li>Maker-checker approval and separation of duties</li>
        <li>Server-side role and resource authorization</li>
        <li>Payment limits and sanctions/compliance checks</li>
        <li>Idempotency and transaction status reconciliation</li>
        <li>Audit trail and privacy-safe observability</li>
      </ul>
    </section>
  `,
  styles: [`.panel { background:white; padding:1.5rem; border:1px solid #dce2ea; border-radius:10px; }`]
})
export class OperationsHomeComponent {}
