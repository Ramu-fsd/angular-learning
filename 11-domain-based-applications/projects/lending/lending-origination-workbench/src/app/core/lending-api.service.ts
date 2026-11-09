import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoanApplication, LoanDocument, UnderwriterNote, LoanStatus, DocumentStatus } from './lending.models';

@Injectable({providedIn:'root'})
export class LendingApiService {
  private readonly http=inject(HttpClient);
  private readonly base='/api/loans/applications';
  list(status?:string){let params=new HttpParams();if(status)params=params.set('status',status);return this.http.get<LoanApplication[]>(this.base,{params});}
  get(id:string){return this.http.get<LoanApplication>(`${this.base}/${id}`);}
  reviewDocument(id:string,docId:string,status:DocumentStatus){return this.http.patch<LoanDocument>(`${this.base}/${id}/documents/${docId}`,{status});}
  addNote(id:string,body:string){return this.http.post<UnderwriterNote>(`${this.base}/${id}/notes`,{body});}
  decide(id:string,status:LoanStatus,reason:string){return this.http.post<LoanApplication>(`${this.base}/${id}/decision`,{status,reason});}
}
