export type PolicyStatus = 'Active' | 'Pending' | 'Expired' | 'Cancelled';
export type ClaimStatus = 'Submitted' | 'Under Review' | 'Awaiting Documents' | 'Approved' | 'Declined' | 'Paid';
export type ClaimPriority = 'High' | 'Medium' | 'Low';

export interface Policy {
  id: string; number: string; holder: string; product: string; status: PolicyStatus;
  startDate: string; endDate: string; premium: number; sumInsured: number;
  email: string; phone: string; coverage: string[];
}
export interface Claim {
  id: string; number: string; policyId: string; claimant: string; type: string;
  lossDate: string; reportedDate: string; status: ClaimStatus; priority: ClaimPriority;
  amount: number; reserve: number; adjuster: string; description: string;
  evidence: { name: string; received: boolean }[]; notes: string[];
}
