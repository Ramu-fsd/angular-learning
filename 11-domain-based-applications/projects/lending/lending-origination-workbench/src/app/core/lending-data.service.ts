import { Injectable, computed, signal } from '@angular/core';
import { LoanApplication, UnderwriterNote, LoanStatus, DocumentStatus } from './lending.models';

const seed:LoanApplication[]=[
{id:'LN-2026-2041',applicant:'Ananya Rao',customerRef:'CUS-•••-3910',product:'Personal Loan',requestedAmount:18000,currency:'USD',termMonths:36,annualIncome:84000,monthlyObligations:950,employment:'Permanent · 5 years',riskBand:'MEDIUM',status:'IN_REVIEW',submittedAt:'2026-11-09T14:15:00Z',assignedTo:'Jordan Lee',purpose:'Home renovation',documents:[{id:'D1',name:'Proof of income',fileName:'salary-statements.pdf',status:'VERIFIED'},{id:'D2',name:'Bank statements',fileName:'bank-statements.pdf',status:'PENDING'},{id:'D3',name:'Identity evidence',fileName:'identity.pdf',status:'VERIFIED'}],assessment:'Income evidence available; bank statement review outstanding.'},
{id:'LN-2026-2040',applicant:'Meridian Foods Ltd',customerRef:'ORG-•••-7402',product:'SME Working Capital',requestedAmount:125000,currency:'USD',termMonths:24,annualIncome:410000,monthlyObligations:12500,employment:'Business · 8 years',riskBand:'HIGH',status:'SUBMITTED',submittedAt:'2026-11-09T12:40:00Z',assignedTo:null,purpose:'Inventory financing',documents:[{id:'D4',name:'Business financials',fileName:'financials.pdf',status:'PENDING'},{id:'D5',name:'Tax returns',fileName:'tax-returns.pdf',status:'PENDING'}],assessment:'Business financial review and ownership checks required.'},
{id:'LN-2026-2039',applicant:'Vikram Nair',customerRef:'CUS-•••-1182',product:'Auto Loan',requestedAmount:26500,currency:'USD',termMonths:60,annualIncome:72000,monthlyObligations:700,employment:'Permanent · 3 years',riskBand:'LOW',status:'APPROVED',submittedAt:'2026-11-08T16:25:00Z',assignedTo:'Jordan Lee',purpose:'Vehicle purchase',documents:[{id:'D6',name:'Proof of income',fileName:'income.pdf',status:'VERIFIED'},{id:'D7',name:'Vehicle quotation',fileName:'vehicle-quote.pdf',status:'VERIFIED'}],assessment:'Illustrative assessment complete; approval shown for workflow demonstration.'},
{id:'LN-2026-2038',applicant:'Sara Williams',customerRef:'CUS-•••-8820',product:'Personal Loan',requestedAmount:9500,currency:'USD',termMonths:24,annualIncome:52000,monthlyObligations:1450,employment:'Contract · 1 year',riskBand:'HIGH',status:'MORE_INFORMATION_REQUIRED',submittedAt:'2026-11-08T11:10:00Z',assignedTo:'Mia Chen',purpose:'Debt consolidation',documents:[{id:'D8',name:'Proof of income',fileName:'income.pdf',status:'REUPLOAD_REQUIRED'}],assessment:'Updated income evidence and obligation clarification requested.'}
];

@Injectable({providedIn:'root'})
export class LendingDataService {
 readonly applications=signal<LoanApplication[]>(seed);
 readonly notes=signal<UnderwriterNote[]>([{id:'N1',applicationId:'LN-2026-2041',author:'Jordan Lee',createdAt:'2026-11-09T15:00:00Z',body:'Please complete bank statement review and reconcile recurring obligations.'}]);
 readonly analyst='Jordan Lee';
 readonly activeCount=computed(()=>this.applications().filter(a=>!['APPROVED','DECLINED'].includes(a.status)).length);
 readonly reviewCount=computed(()=>this.applications().filter(a=>a.status==='IN_REVIEW').length);
 readonly highRiskCount=computed(()=>this.applications().filter(a=>a.riskBand==='HIGH').length);
 readonly requestedValue=computed(()=>this.applications().filter(a=>!['APPROVED','DECLINED'].includes(a.status)).reduce((sum,a)=>sum+a.requestedAmount,0));
 find(id:string){return this.applications().find(a=>a.id===id);}
 assign(id:string){this.applications.update(xs=>xs.map(a=>a.id===id?{...a,assignedTo:this.analyst,status:a.status==='SUBMITTED'?'IN_REVIEW':a.status}:a));}
 reviewDocument(id:string,docId:string,status:DocumentStatus){this.applications.update(xs=>xs.map(a=>a.id===id?{...a,documents:a.documents.map(d=>d.id===docId?{...d,status}:d)}:a));}
 updateStatus(id:string,status:LoanStatus){this.applications.update(xs=>xs.map(a=>a.id===id?{...a,status}:a));}
 addNote(id:string,body:string){const v=body.trim();if(v)this.notes.update(ns=>[{id:`N-${Date.now()}`,applicationId:id,author:this.analyst,createdAt:new Date().toISOString(),body:v},...ns]);}
}
