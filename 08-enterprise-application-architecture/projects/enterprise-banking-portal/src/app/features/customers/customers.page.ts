import { Component, signal } from '@angular/core';

interface Customer { id: string; name: string; segment: string; status: string; }

@Component({
  standalone: true,
  template: `
    <p class="eyebrow">CUSTOMER DOMAIN</p>
    <h1>Customer directory</h1>
    <p class="muted">A feature-owned page with its own model and UI state.</p>
    <input type="search" placeholder="Search customers" aria-label="Search customers" (input)="search($event)" />
    <section class="panel">
      <table>
        <thead><tr><th>Customer ID</th><th>Name</th><th>Segment</th><th>Status</th></tr></thead>
        <tbody>
          @for (customer of filtered(); track customer.id) {
            <tr><td>{{ customer.id }}</td><td>{{ customer.name }}</td><td>{{ customer.segment }}</td><td><span class="status">{{ customer.status }}</span></td></tr>
          } @empty { <tr><td colspan="4">No matching customers.</td></tr> }
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    :host{display:block}.eyebrow{color:#687791;font-size:10px;font-weight:800;letter-spacing:1.4px}
    h1{margin:5px 0;color:#17243b;font-size:30px}.muted{color:#7a879a;font-size:13px}
    input{width:min(100%,360px);height:40px;margin:18px 0;padding:0 12px;border:1px solid #dce2eb;border-radius:8px;font:inherit}
    .panel{overflow:auto;background:white;border:1px solid #e7ebf2;border-radius:12px;padding:18px}
    table{width:100%;border-collapse:collapse;text-align:left;white-space:nowrap}
    th,td{padding:13px 10px;border-bottom:1px solid #edf0f4;font-size:12px}
    th{color:#78859a;font-size:10px;text-transform:uppercase}
    .status{background:#e8f7ef;color:#19734e;border-radius:20px;padding:5px 9px;font-size:10px;font-weight:700}
  `]
})
export class CustomersPage {
  private readonly customers: Customer[] = [
    { id: 'CUS-10021', name: 'Aarav Sharma', segment: 'Retail', status: 'ACTIVE' },
    { id: 'CUS-10022', name: 'Meera Reddy', segment: 'Priority', status: 'ACTIVE' },
    { id: 'CUS-10023', name: 'Northwind Traders', segment: 'Business', status: 'REVIEW' },
    { id: 'CUS-10024', name: 'Vikram Iyer', segment: 'Retail', status: 'ACTIVE' }
  ];
  readonly term = signal('');
  readonly filtered = () => this.customers.filter(customer =>
    `${customer.id} ${customer.name} ${customer.segment}`.toLowerCase().includes(this.term().toLowerCase())
  );
  search(event: Event): void { this.term.set((event.target as HTMLInputElement).value); }
}
