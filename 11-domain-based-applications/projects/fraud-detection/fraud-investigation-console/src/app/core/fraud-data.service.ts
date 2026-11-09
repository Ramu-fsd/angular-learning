import { Injectable, computed, signal } from '@angular/core';
import { AlertStatus, FraudAlert, InvestigationNote, Severity } from './fraud.models';

const seed: FraudAlert[] = [
  {id:'FRD-84021',transactionId:'TXN-902184',customerRef:'CUS-•••-1042',merchant:'NORTHSTAR ELECTRONICS',amount:4890,currency:'USD',riskScore:98,severity:'CRITICAL',status:'OPEN',reason:'Unusual device and high-value purchase following credential reset',createdAt:'2026-11-09T15:42:00Z',channel:'E-COMMERCE',country:'US',assignedTo:null},
  {id:'FRD-84020',transactionId:'TXN-902177',customerRef:'CUS-•••-8831',merchant:'GLOBAL TRAVEL ONLINE',amount:2180,currency:'USD',riskScore:91,severity:'CRITICAL',status:'INVESTIGATING',reason:'Velocity threshold exceeded across multiple merchants',createdAt:'2026-11-09T15:21:00Z',channel:'CARD-NOT-PRESENT',country:'GB',assignedTo:'Alex Morgan'},
  {id:'FRD-84019',transactionId:'TXN-902166',customerRef:'CUS-•••-5510',merchant:'METRO DIGITAL SERVICES',amount:740,currency:'EUR',riskScore:82,severity:'HIGH',status:'OPEN',reason:'Transaction location differs from recent customer activity',createdAt:'2026-11-09T14:58:00Z',channel:'MOBILE',country:'DE',assignedTo:null},
  {id:'FRD-84018',transactionId:'TXN-902151',customerRef:'CUS-•••-7724',merchant:'QUICKMART ONLINE',amount:129,currency:'USD',riskScore:64,severity:'MEDIUM',status:'ESCALATED',reason:'Multiple failed authentication attempts before approval',createdAt:'2026-11-09T14:32:00Z',channel:'E-COMMERCE',country:'US',assignedTo:'Jordan Lee'},
  {id:'FRD-84017',transactionId:'TXN-902140',customerRef:'CUS-•••-2918',merchant:'CITY FUEL NETWORK',amount:86,currency:'USD',riskScore:38,severity:'LOW',status:'CLOSED',reason:'Low-confidence rule match; customer confirmed transaction',createdAt:'2026-11-09T13:55:00Z',channel:'POS',country:'US',assignedTo:'Alex Morgan'},
  {id:'FRD-84016',transactionId:'TXN-902128',customerRef:'CUS-•••-9011',merchant:'P2P TRANSFER NETWORK',amount:3200,currency:'GBP',riskScore:88,severity:'HIGH',status:'INVESTIGATING',reason:'New beneficiary and unusual transfer pattern',createdAt:'2026-11-09T13:20:00Z',channel:'P2P',country:'GB',assignedTo:'Sam Patel'}
];

@Injectable({providedIn:'root'})
export class FraudDataService {
  readonly alerts = signal<FraudAlert[]>(seed);
  readonly notes = signal<InvestigationNote[]>([
    {id:'NOTE-1',alertId:'FRD-84020',author:'Alex Morgan',createdAt:'2026-11-09T15:28:00Z',body:'Reviewing recent device fingerprint and customer authentication history.'}
  ]);
  readonly currentAnalyst = signal('Alex Morgan');
  readonly openCount = computed(()=>this.alerts().filter(a=>a.status==='OPEN').length);
  readonly criticalCount = computed(()=>this.alerts().filter(a=>a.severity==='CRITICAL').length);
  readonly investigatingCount = computed(()=>this.alerts().filter(a=>a.status==='INVESTIGATING').length);
  readonly highRiskExposure = computed(()=>this.alerts().filter(a=>a.severity==='HIGH'||a.severity==='CRITICAL').reduce((s,a)=>s+a.amount,0));
  find(id:string){return this.alerts().find(a=>a.id===id);}
  assign(id:string){this.alerts.update(items=>items.map(a=>a.id===id?{...a,assignedTo:this.currentAnalyst().trim(),status:a.status==='OPEN'?'INVESTIGATING':a.status}:a));}
  addNote(id:string,body:string){const note=body.trim();if(!note)return;this.notes.update(items=>[{id:`NOTE-${Date.now()}`,alertId:id,author:this.currentAnalyst(),createdAt:new Date().toISOString(),body:note},...items]);}
  updateStatus(id:string,status:AlertStatus){this.alerts.update(items=>items.map(a=>a.id===id?{...a,status}:a));}
  bySeverity(severity:Severity){return this.alerts().filter(a=>a.severity===severity);}
}
