export type PaymentStatus='PENDING_APPROVAL'|'APPROVED'|'PROCESSING'|'COMPLETED'|'REJECTED'|'FAILED';
export interface PaymentInstruction {
 id:string; beneficiary:string; beneficiaryAccountMasked:string; sourceAccountMasked:string;
 reference:string; amount:number; currency:string; createdAt:string; submittedBy:string;
 status:PaymentStatus; purpose:string; version:number; rejectionReason?:string;
}
export interface AuditEvent { id:string; paymentId:string; actor:string; action:string; timestamp:string; reason?:string; }
