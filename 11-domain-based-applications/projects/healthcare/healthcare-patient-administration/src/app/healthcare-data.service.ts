import { Injectable, computed, signal } from '@angular/core';
import { Appointment, AppointmentStatus, BillingItem, Encounter, Patient } from './models';
@Injectable({providedIn:'root'})
export class HealthcareDataService {
 readonly patients = signal<Patient[]>([
  {id:'PT-1001',mrn:'MRN-71001',name:'Ananya Rao',dob:'1988-04-12',gender:'Female',phone:'+91 90000 71001',email:'ananya@example.test',bloodGroup:'O+',status:'Active',allergies:['Penicillin']},
  {id:'PT-1002',mrn:'MRN-71002',name:'Vikram Nair',dob:'1975-09-23',gender:'Male',phone:'+91 90000 71002',email:'vikram@example.test',bloodGroup:'B+',status:'Active',allergies:[]},
  {id:'PT-1003',mrn:'MRN-71003',name:'Sana Khan',dob:'1996-01-08',gender:'Female',phone:'+91 90000 71003',email:'sana@example.test',bloodGroup:'AB+',status:'Active',allergies:['Latex']},
  {id:'PT-1004',mrn:'MRN-71004',name:'Rohit Das',dob:'1969-06-17',gender:'Male',phone:'+91 90000 71004',email:'rohit@example.test',bloodGroup:'A-',status:'Inactive',allergies:[]},
  {id:'PT-1005',mrn:'MRN-71005',name:'Megha Iyer',dob:'2001-12-02',gender:'Female',phone:'+91 90000 71005',email:'megha@example.test',bloodGroup:'O-',status:'Active',allergies:['Dust']}
 ]);
 readonly appointments = signal<Appointment[]>([
  {id:'APT-3001',patientId:'PT-1001',patientName:'Ananya Rao',department:'Cardiology',clinician:'Dr. N. Reddy',date:'2026-11-09',time:'09:30',type:'Follow-up',status:'Checked In'},
  {id:'APT-3002',patientId:'PT-1002',patientName:'Vikram Nair',department:'Orthopedics',clinician:'Dr. P. Shah',date:'2026-11-09',time:'10:15',type:'Consultation',status:'Scheduled'},
  {id:'APT-3003',patientId:'PT-1003',patientName:'Sana Khan',department:'Dermatology',clinician:'Dr. A. Thomas',date:'2026-11-09',time:'11:00',type:'Review',status:'Scheduled'},
  {id:'APT-3004',patientId:'PT-1005',patientName:'Megha Iyer',department:'General Medicine',clinician:'Dr. S. Rao',date:'2026-11-10',time:'12:30',type:'Consultation',status:'Scheduled'},
  {id:'APT-3005',patientId:'PT-1004',patientName:'Rohit Das',department:'Cardiology',clinician:'Dr. N. Reddy',date:'2026-11-08',time:'15:00',type:'Follow-up',status:'Completed'}
 ]);
 readonly encounters = signal<Encounter[]>([
  {id:'ENC-8001',patientId:'PT-1001',date:'2026-10-20',department:'Cardiology',clinician:'Dr. N. Reddy',summary:'Routine follow-up encounter. Review plan recorded by care team.'},
  {id:'ENC-8002',patientId:'PT-1001',date:'2026-07-12',department:'General Medicine',clinician:'Dr. S. Rao',summary:'Outpatient visit summary available in the clinical record.'},
  {id:'ENC-8003',patientId:'PT-1002',date:'2026-10-28',department:'Orthopedics',clinician:'Dr. P. Shah',summary:'Post-consultation review. Follow-up recommended.'},
  {id:'ENC-8004',patientId:'PT-1003',date:'2026-09-16',department:'Dermatology',clinician:'Dr. A. Thomas',summary:'Review visit. Care plan documented.'}
 ]);
 readonly billing = signal<BillingItem[]>([
  {id:'BIL-5001',patientId:'PT-1001',patientName:'Ananya Rao',service:'Cardiology consultation',serviceDate:'2026-10-20',amount:1800,payer:'CarePlus Health',status:'Approved'},
  {id:'BIL-5002',patientId:'PT-1002',patientName:'Vikram Nair',service:'Orthopedic consultation',serviceDate:'2026-10-28',amount:2200,payer:'National Health Cover',status:'In Review'},
  {id:'BIL-5003',patientId:'PT-1003',patientName:'Sana Khan',service:'Dermatology review',serviceDate:'2026-09-16',amount:1500,payer:'CarePlus Health',status:'Denied'},
  {id:'BIL-5004',patientId:'PT-1005',patientName:'Megha Iyer',service:'General medicine consultation',serviceDate:'2026-10-30',amount:1200,payer:'Self Pay',status:'Paid'}
 ]);
 readonly activePatients = computed(()=>this.patients().filter(p=>p.status==='Active').length);
 readonly upcomingAppointments = computed(()=>this.appointments().filter(a=>['Scheduled','Checked In'].includes(a.status)).length);
 addAppointment(a:Appointment){this.appointments.update(items=>[a,...items]);}
 updateAppointment(id:string,status:AppointmentStatus){this.appointments.update(items=>items.map(a=>a.id===id?{...a,status}:a));}
}
