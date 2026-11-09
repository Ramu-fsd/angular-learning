export interface Payment {
  id: string;
  reference: string;
  beneficiary: string;
  amount: number;
  status: 'PENDING' | 'APPROVED';
}
