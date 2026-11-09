import { Injectable, computed, signal } from '@angular/core';
import { Payment, PaymentPriority, PaymentStatus } from './payment.models';

const seedPayments: Payment[] = [
  {
    id: 'PAY-81024', reference: 'NSTR-20261109-81024', debtor: 'Northstar Corporate Treasury',
    beneficiary: 'Apex Components Pvt Ltd', beneficiaryBank: 'HDFC Bank · Mumbai',
    amount: 485000, currency: 'INR', channel: 'Domestic Transfer', priority: 'Urgent',
    status: 'Pending Approval', createdAt: '2026-11-09T09:12:00', requestedBy: 'Rohit Sharma',
    purpose: 'Supplier settlement for November procurement.',
    activity: [
      { id: 'pa1', at: '2026-11-09T09:12:00', actor: 'Rohit Sharma', message: 'Payment initiated and submitted for maker-checker approval.' }
    ]
  },
  {
    id: 'PAY-81023', reference: 'NSTR-20261109-81023', debtor: 'Northstar Retail Banking',
    beneficiary: 'Greenfield Utilities', beneficiaryBank: 'ICICI Bank · Hyderabad',
    amount: 78250, currency: 'INR', channel: 'Domestic Transfer', priority: 'Normal',
    status: 'Processing', createdAt: '2026-11-09T08:40:00', requestedBy: 'Priya Nair',
    purpose: 'Monthly utility settlement.',
    activity: [{ id: 'pa2', at: '2026-11-09T08:40:00', actor: 'Priya Nair', message: 'Payment passed approval and entered processing.' }]
  },
  {
    id: 'PAY-81022', reference: 'NSTR-20261108-81022', debtor: 'Northstar Corporate Treasury',
    beneficiary: 'Meridian Global Services', beneficiaryBank: 'Standard Chartered · Singapore',
    amount: 12500, currency: 'USD', channel: 'Wire Transfer', priority: 'High',
    status: 'Completed', createdAt: '2026-11-08T16:22:00', requestedBy: 'Arjun Rao',
    purpose: 'Regional technology services invoice.',
    activity: [{ id: 'pa3', at: '2026-11-08T16:22:00', actor: 'System', message: 'Payment completed. Confirmation received from the simulated rail.' }]
  },
  {
    id: 'PAY-81021', reference: 'NSTR-20261108-81021', debtor: 'Northstar Retail Banking',
    beneficiary: 'Sapphire Insurance Ltd', beneficiaryBank: 'Axis Bank · Bengaluru',
    amount: 225000, currency: 'INR', channel: 'Internal Transfer', priority: 'Normal',
    status: 'Rejected', createdAt: '2026-11-08T11:05:00', requestedBy: 'Meera Shah',
    purpose: 'Premium settlement batch.',
    activity: [{ id: 'pa4', at: '2026-11-08T11:30:00', actor: 'Approver', message: 'Rejected: beneficiary details require verification.' }]
  },
  {
    id: 'PAY-81020', reference: 'NSTR-20261107-81020', debtor: 'Northstar Corporate Treasury',
    beneficiary: 'Orion Logistics', beneficiaryBank: 'Kotak Mahindra Bank · Pune',
    amount: 94000, currency: 'INR', channel: 'Domestic Transfer', priority: 'High',
    status: 'Failed', createdAt: '2026-11-07T14:10:00', requestedBy: 'Karthik Reddy',
    purpose: 'Freight and logistics payment.',
    activity: [{ id: 'pa5', at: '2026-11-07T14:16:00', actor: 'System', message: 'Simulated payment failed due to beneficiary bank timeout.' }]
  }
];

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  readonly payments = signal<Payment[]>(seedPayments);
  readonly totalCount = computed(() => this.payments().length);
  readonly pendingCount = computed(() => this.payments().filter((p) => p.status === 'Pending Approval').length);
  readonly completedCount = computed(() => this.payments().filter((p) => p.status === 'Completed').length);
  readonly failedCount = computed(() => this.payments().filter((p) => p.status === 'Failed' || p.status === 'Rejected').length);

  getById(id: string): Payment | undefined {
    return this.payments().find((payment) => payment.id === id);
  }

  create(input: { debtor: string; beneficiary: string; beneficiaryBank: string; amount: number; currency: string; channel: Payment['channel']; priority: PaymentPriority; requestedBy: string; purpose: string }): string {
    const sequence = 81025 + this.payments().length - seedPayments.length;
    const id = 'PAY-' + sequence;
    const now = new Date().toISOString();
    const payment: Payment = {
      ...input, id, reference: 'NSTR-' + now.slice(0, 10).replaceAll('-', '') + '-' + sequence,
      status: 'Pending Approval', createdAt: now,
      activity: [{ id: this.newId(), at: now, actor: input.requestedBy, message: 'Payment submitted and awaiting checker approval.' }]
    };
    this.payments.update((items) => [payment, ...items]);
    return id;
  }

  updateStatus(id: string, status: PaymentStatus, actor: string, message: string): void {
    const event = { id: this.newId(), at: new Date().toISOString(), actor, message };
    this.payments.update((items) => items.map((p) => p.id === id ? { ...p, status, activity: [event, ...p.activity] } : p));
  }

  addNote(id: string, message: string): void {
    const event = { id: this.newId(), at: new Date().toISOString(), actor: 'You', message };
    this.payments.update((items) => items.map((p) => p.id === id ? { ...p, activity: [event, ...p.activity] } : p));
  }

  private newId(): string { return Math.random().toString(36).slice(2, 10); }
}
