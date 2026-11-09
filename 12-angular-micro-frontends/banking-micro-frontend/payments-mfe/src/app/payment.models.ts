export type PaymentStatus = 'Pending Approval' | 'Processing' | 'Completed' | 'Rejected' | 'Failed';
export type PaymentPriority = 'Urgent' | 'High' | 'Normal';

export interface PaymentActivity {
  id: string;
  at: string;
  actor: string;
  message: string;
}

export interface Payment {
  id: string;
  reference: string;
  debtor: string;
  beneficiary: string;
  beneficiaryBank: string;
  amount: number;
  currency: string;
  channel: 'Domestic Transfer' | 'Wire Transfer' | 'Internal Transfer';
  priority: PaymentPriority;
  status: PaymentStatus;
  createdAt: string;
  requestedBy: string;
  purpose: string;
  activity: PaymentActivity[];
}
