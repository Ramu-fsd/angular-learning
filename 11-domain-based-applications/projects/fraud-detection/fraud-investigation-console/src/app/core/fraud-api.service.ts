import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FraudAlert, InvestigationNote, AlertStatus } from './fraud.models';

@Injectable({ providedIn: 'root' })
export class FraudApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/fraud/alerts';

  list(status?: string, severity?: string) {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    if (severity) params = params.set('severity', severity);
    return this.http.get<FraudAlert[]>(this.baseUrl, { params });
  }
  get(id: string) { return this.http.get<FraudAlert>(`${this.baseUrl}/${id}`); }
  assign(id: string, analystId: string) {
    return this.http.post<FraudAlert>(`${this.baseUrl}/${id}/assign`, { analystId });
  }
  addNote(id: string, body: string) {
    return this.http.post<InvestigationNote>(`${this.baseUrl}/${id}/notes`, { body });
  }
  updateStatus(id: string, status: AlertStatus) {
    return this.http.patch<FraudAlert>(`${this.baseUrl}/${id}/status`, { status });
  }
}
