export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertStatus = 'OPEN' | 'INVESTIGATING' | 'ESCALATED' | 'CLOSED';

export interface FraudAlert {
  id: string;
  transactionId: string;
  customerRef: string;
  merchant: string;
  amount: number;
  currency: string;
  riskScore: number;
  severity: Severity;
  status: AlertStatus;
  reason: string;
  createdAt: string;
  channel: string;
  country: string;
  assignedTo: string | null;
}

export interface InvestigationNote {
  id: string;
  alertId: string;
  author: string;
  createdAt: string;
  body: string;
}
