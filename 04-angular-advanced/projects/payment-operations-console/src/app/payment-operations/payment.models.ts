export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export interface PaymentRecord {
  readonly id: string;
  readonly reference: string;
  readonly beneficiary: string;
  readonly amountMinorUnits: number;
  readonly currency: 'INR';
  readonly status: PaymentStatus;
  readonly createdAt: string;
}
