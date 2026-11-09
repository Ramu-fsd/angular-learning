export type PatientStatus = 'Active' | 'Inactive';
export type AppointmentStatus = 'Scheduled' | 'Checked In' | 'Completed' | 'Cancelled';
export type BillingStatus = 'Submitted' | 'In Review' | 'Approved' | 'Denied' | 'Paid';
export interface Patient { id:string; mrn:string; name:string; dob:string; gender:string; phone:string; email:string; bloodGroup:string; status:PatientStatus; allergies:string[]; }
export interface Appointment { id:string; patientId:string; patientName:string; department:string; clinician:string; date:string; time:string; type:string; status:AppointmentStatus; }
export interface Encounter { id:string; patientId:string; date:string; department:string; clinician:string; summary:string; }
export interface BillingItem { id:string; patientId:string; patientName:string; service:string; serviceDate:string; amount:number; payer:string; status:BillingStatus; }
