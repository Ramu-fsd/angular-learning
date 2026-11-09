export type OrderStatus='Placed'|'Confirmed'|'Processing'|'Shipped'|'Delivered'|'Cancelled';
export type ReturnStatus='Requested'|'Approved'|'Rejected'|'Refunded';
export interface Product{id:string;sku:string;name:string;category:string;description:string;price:number;stock:number;rating:number;badge?:string;}
export interface CartLine{productId:string;quantity:number;}
export interface OrderLine{productId:string;name:string;sku:string;quantity:number;unitPrice:number;}
export interface Order{id:string;number:string;customer:string;email:string;placedAt:string;status:OrderStatus;paymentStatus:string;shippingAddress:string;carrier:string;trackingNumber:string;lines:OrderLine[];total:number;timeline:{label:string;date:string;done:boolean}[];}
export interface ReturnRequest{id:string;orderNumber:string;customer:string;item:string;reason:string;requestedAt:string;status:ReturnStatus;refund:number;}
