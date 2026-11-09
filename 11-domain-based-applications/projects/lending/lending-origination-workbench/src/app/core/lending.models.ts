export type LoanStatus = 'SUBMITTED'|'IN_REVIEW'|'MORE_INFORMATION_REQUIRED'|'APPROVED'|'DECLINED';
export type DocumentStatus = 'PENDING'|'VERIFIED'|'REUPLOAD_REQUIRED';
export interface LoanDocument { id:string; name:string; fileName:string; status:DocumentStatus; }
export interface LoanApplication {
  id:string; applicant:string; customerRef:string; product:string; requestedAmount:number; currency:string;
  termMonths:number; annualIncome:number; monthlyObligations:number; employment:string;
  riskBand:'LOW'|'MEDIUM'|'HIGH'; status:LoanStatus; submittedAt:string; assignedTo:string|null;
  purpose:string; documents:LoanDocument[]; assessment:string;
}
export interface UnderwriterNote { id:string; applicationId:string; author:string; createdAt:string; body:string; }
