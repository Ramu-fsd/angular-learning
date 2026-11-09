export type ShipmentStatus='Booked'|'Dispatched'|'In Transit'|'At Delivery Hub'|'Delivered'|'Delayed';
export type StopStatus='Pending'|'Arrived'|'Completed'|'Exception';
export type VehicleStatus='Available'|'Assigned'|'Maintenance';
export type Priority='High'|'Medium'|'Low';
export interface Stop{id:string;name:string;city:string;plannedTime:string;actualTime:string;status:StopStatus;kind:'Pickup'|'Hub'|'Delivery';}
export interface Shipment{id:string;number:string;customer:string;origin:string;destination:string;createdAt:string;eta:string;status:ShipmentStatus;priority:Priority;service:string;weight:number;vehicleId:string;driver:string;stops:Stop[];exceptions:string[];}
export interface Vehicle{id:string;registration:string;type:string;capacityKg:number;status:VehicleStatus;driver:string;location:string;}
