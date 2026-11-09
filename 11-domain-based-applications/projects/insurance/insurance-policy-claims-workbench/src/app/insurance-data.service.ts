import { Injectable, computed, signal } from '@angular/core';
import { Claim, ClaimStatus, Policy } from './models';

@Injectable({ providedIn: 'root' })
export class InsuranceDataService {
  readonly policies = signal<Policy[]>([
    { id:'POL-1001', number:'AUTO-2026-1001', holder:'Priya Sharma', product:'Motor Comprehensive', status:'Active', startDate:'2026-01-01', endDate:'2026-12-31', premium:18400, sumInsured:850000, email:'priya@example.test', phone:'+91 90000 10001', coverage:['Own damage','Third-party liability','Theft','Roadside assistance'] },
    { id:'POL-1002', number:'HLT-2026-1002', holder:'Arjun Mehta', product:'Family Health Plus', status:'Active', startDate:'2026-03-01', endDate:'2027-02-28', premium:26500, sumInsured:1000000, email:'arjun@example.test', phone:'+91 90000 10002', coverage:['Hospitalization','Day-care procedures','Pre and post hospitalization'] },
    { id:'POL-1003', number:'HOM-2025-1003', holder:'Meera Iyer', product:'Home Secure', status:'Pending', startDate:'2026-11-15', endDate:'2027-11-14', premium:9200, sumInsured:4500000, email:'meera@example.test', phone:'+91 90000 10003', coverage:['Fire and allied perils','Burglary','Natural calamities'] },
    { id:'POL-1004', number:'TRV-2025-1004', holder:'Rahul Verma', product:'Travel Protect', status:'Expired', startDate:'2025-06-10', endDate:'2025-06-24', premium:3200, sumInsured:500000, email:'rahul@example.test', phone:'+91 90000 10004', coverage:['Emergency medical','Trip interruption','Baggage loss'] },
    { id:'POL-1005', number:'AUTO-2026-1005', holder:'Kavya Rao', product:'Motor Third Party', status:'Active', startDate:'2026-05-01', endDate:'2027-04-30', premium:7800, sumInsured:500000, email:'kavya@example.test', phone:'+91 90000 10005', coverage:['Third-party liability','Personal accident'] }
  ]);

  readonly claims = signal<Claim[]>([
    { id:'CLM-2001', number:'CL-26-2001', policyId:'POL-1001', claimant:'Priya Sharma', type:'Motor accident', lossDate:'2026-10-28', reportedDate:'2026-10-29', status:'Under Review', priority:'High', amount:185000, reserve:160000, adjuster:'Alex Morgan', description:'Collision damage reported after a city intersection incident. Vehicle inspection is pending.', evidence:[{name:'Claim form',received:true},{name:'Police report',received:true},{name:'Repair estimate',received:false},{name:'Vehicle photographs',received:true}], notes:['Initial notification received.','Inspection appointment requested.'] },
    { id:'CLM-2002', number:'CL-26-2002', policyId:'POL-1002', claimant:'Arjun Mehta', type:'Medical reimbursement', lossDate:'2026-10-18', reportedDate:'2026-10-22', status:'Awaiting Documents', priority:'Medium', amount:74000, reserve:74000, adjuster:'Neha Kapoor', description:'Reimbursement request for a covered hospitalization. Itemized bill is outstanding.', evidence:[{name:'Discharge summary',received:true},{name:'Hospital invoice',received:true},{name:'Itemized bill',received:false},{name:'Payment receipts',received:false}], notes:['Document request sent to claimant.'] },
    { id:'CLM-2003', number:'CL-26-2003', policyId:'POL-1005', claimant:'Kavya Rao', type:'Third-party property damage', lossDate:'2026-10-12', reportedDate:'2026-10-13', status:'Submitted', priority:'High', amount:225000, reserve:200000, adjuster:'Unassigned', description:'Third-party property damage notification. Liability assessment has not started.', evidence:[{name:'Claim form',received:true},{name:'Incident photographs',received:false},{name:'Third-party estimate',received:false}], notes:[] },
    { id:'CLM-2004', number:'CL-26-2004', policyId:'POL-1003', claimant:'Meera Iyer', type:'Property water damage', lossDate:'2026-09-30', reportedDate:'2026-10-01', status:'Approved', priority:'Low', amount:56000, reserve:56000, adjuster:'Alex Morgan', description:'Water damage assessment completed. Settlement approval recorded in this demo.', evidence:[{name:'Claim form',received:true},{name:'Surveyor report',received:true},{name:'Repair invoice',received:true}], notes:['Assessment completed.','Approval recorded.'] }
  ]);

  readonly openClaims = computed(() => this.claims().filter(c => !['Paid','Declined'].includes(c.status)).length);
  readonly totalExposure = computed(() => this.claims().reduce((sum, c) => sum + c.reserve, 0));

  updateClaim(id: string, changes: Partial<Claim>): void {
    this.claims.update(items => items.map(c => c.id === id ? { ...c, ...changes } : c));
  }
  addNote(id: string, note: string): void {
    this.claims.update(items => items.map(c => c.id === id ? { ...c, notes: [...c.notes, note] } : c));
  }
  setStatus(id: string, status: ClaimStatus): void { this.updateClaim(id, { status }); }
}
