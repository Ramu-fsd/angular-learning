import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentInstruction } from '../models/payment.models';

/** Replace the local demo data adapter with these typed API calls for backend integration. */
@Injectable({providedIn:'root'})
export class PaymentApiService {
 private readonly http=inject(HttpClient);
 private readonly base='/api/v1/payments';
 list(page=0,size=25,status='PENDING_APPROVAL',query=''){
  const params=new HttpParams().set('page',page).set('size',size).set('status',status).set('query',query);
  return this.http.get<{items:PaymentInstruction[];totalElements:number}>(this.base,{params});
 }
 get(id:string):Observable<PaymentInstruction>{return this.http.get<PaymentInstruction>(`${this.base}/${encodeURIComponent(id)}`);}
 create(body:unknown,idempotencyKey:string){return this.http.post<PaymentInstruction>(this.base,body,{headers:{'Idempotency-Key':idempotencyKey}});}
 approve(id:string,version:number,idempotencyKey:string){return this.http.post<PaymentInstruction>(`${this.base}/${encodeURIComponent(id)}/approve`,{version},{headers:{'Idempotency-Key':idempotencyKey}});}
 reject(id:string,version:number,reason:string,idempotencyKey:string){return this.http.post<PaymentInstruction>(`${this.base}/${encodeURIComponent(id)}/reject`,{version,reason},{headers:{'Idempotency-Key':idempotencyKey}});}
}
