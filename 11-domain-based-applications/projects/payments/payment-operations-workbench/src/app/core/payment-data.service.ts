import { Injectable, computed, signal } from '@angular/core';
import { AuditEvent, PaymentInstruction, PaymentStatus } from '../models/payment.models';

@Injectable({providedIn:'root'})
export class PaymentDataService {
 readonly currentOperator=signal('ops.alex');
 readonly payments=signal<PaymentInstruction[]>([
  {id:'PAY-84021',beneficiary:'Northstar Utilities',beneficiaryAccountMasked:'•••• 9921',sourceAccountMasked:'•••• 4821',reference:'INV-4431',amount:1280.50,currency:'USD',createdAt:'2026-11-08T10:15:00Z',submittedBy:'ops.jordan',status:'PENDING_APPROVAL',purpose:'Utility invoice',version:1},
  {id:'PAY-84022',beneficiary:'Apex Logistics',beneficiaryAccountMasked:'•••• 3011',sourceAccountMasked:'•••• 4821',reference:'SET-209',amount:8450,currency:'USD',createdAt:'2026-11-08T09:20:00Z',submittedBy:'ops.alex',status:'PENDING_APPROVAL',purpose:'Vendor settlement',version:1},
  {id:'PAY-84023',beneficiary:'Meridian Supplies',beneficiaryAccountMasked:'•••• 1882',sourceAccountMasked:'•••• 9014',reference:'PO-8812',amount:3275.25,currency:'USD',createdAt:'2026-11-07T15:40:00Z',submittedBy:'ops.jordan',status:'APPROVED',purpose:'Purchase order',version:2},
  {id:'PAY-84024',beneficiary:'Cloudline Services',beneficiaryAccountMasked:'•••• 6640',sourceAccountMasked:'•••• 4821',reference:'SUB-110',amount:960,currency:'USD',createdAt:'2026-11-06T12:05:00Z',submittedBy:'ops.alex',status:'COMPLETED',purpose:'Monthly services',version:3},
  {id:'PAY-84025',beneficiary:'Harbor Consulting',beneficiaryAccountMasked:'•••• 1029',sourceAccountMasked:'•••• 9014',reference:'CONS-88',amount:2150,currency:'USD',createdAt:'2026-11-06T08:30:00Z',submittedBy:'ops.jordan',status:'REJECTED',purpose:'Consulting services',version:2,rejectionReason:'Supporting invoice reference required'}
 ]);
 readonly audit=signal<AuditEvent[]>([
  {id:'AUD-1',paymentId:'PAY-84021',actor:'ops.jordan',action:'SUBMITTED',timestamp:'2026-11-08T10:15:00Z'},
  {id:'AUD-2',paymentId:'PAY-84022',actor:'ops.alex',action:'SUBMITTED',timestamp:'2026-11-08T09:20:00Z'},
  {id:'AUD-3',paymentId:'PAY-84023',actor:'ops.alex',action:'APPROVED',timestamp:'2026-11-07T16:02:00Z',reason:'Invoice and beneficiary details reviewed'}
 ]);
 readonly pendingCount=computed(()=>this.payments().filter(p=>p.status==='PENDING_APPROVAL').length);
 readonly totalPendingValue=computed(()=>this.payments().filter(p=>p.status==='PENDING_APPROVAL').reduce((s,p)=>s+p.amount,0));
 readonly completedCount=computed(()=>this.payments().filter(p=>p.status==='COMPLETED').length);
 readonly rejectedCount=computed(()=>this.payments().filter(p=>p.status==='REJECTED').length);

 find(id:string){return this.payments().find(p=>p.id===id);}
 private record(paymentId:string,action:string,reason?:string){
  this.audit.update(list=>[{id:`AUD-${Date.now()}`,paymentId,actor:this.currentOperator(),action,timestamp:new Date().toISOString(),reason},...list]);
 }
 create(input:{beneficiary:string;beneficiaryAccountMasked:string;sourceAccountMasked:string;reference:string;amount:number;currency:string;purpose:string}):string{
  const id=`PAY-${String(Date.now()).slice(-6)}`;
  const item:PaymentInstruction={id,...input,createdAt:new Date().toISOString(),submittedBy:this.currentOperator(),status:'PENDING_APPROVAL',version:1};
  this.payments.update(list=>[item,...list]);this.record(id,'SUBMITTED');return id;
 }
 approve(id:string):string|null{
  const p=this.find(id);if(!p)return 'Payment not found.';
  if(p.status!=='PENDING_APPROVAL')return 'Only pending payments can be approved.';
  if(p.submittedBy===this.currentOperator())return 'Segregation of duties: the submitter cannot approve their own payment.';
  this.payments.update(list=>list.map(x=>x.id===id?{...x,status:'APPROVED',version:x.version+1}:x));
  this.record(id,'APPROVED','Payment reviewed by a different operator.');return null;
 }
 reject(id:string,reason:string):string|null{
  const p=this.find(id);if(!p)return 'Payment not found.';
  if(p.status!=='PENDING_APPROVAL')return 'Only pending payments can be rejected.';
  if(p.submittedBy===this.currentOperator())return 'Segregation of duties: the submitter cannot reject their own payment.';
  if(!reason.trim())return 'A rejection reason is required.';
  this.payments.update(list=>list.map(x=>x.id===id?{...x,status:'REJECTED',version:x.version+1,rejectionReason:reason}:x));
  this.record(id,'REJECTED',reason);return null;
 }
}
