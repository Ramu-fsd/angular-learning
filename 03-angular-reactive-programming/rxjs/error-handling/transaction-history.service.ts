import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, throwError, timeout, catchError } from 'rxjs';

export interface TransactionHistoryPage {
  readonly content: readonly {
    readonly id: string;
    readonly maskedReference: string;
    readonly status: string;
  }[];
  readonly totalElements: number;
}

@Injectable({ providedIn: 'root' })
export class TransactionHistoryService {
  private readonly http = inject(HttpClient);

  getHistory(accountId: string): Observable<TransactionHistoryPage> {
    return this.http.get<TransactionHistoryPage>(
      `/api/accounts/${encodeURIComponent(accountId)}/transactions`
    ).pipe(
      timeout({ first: 5_000 }),
      // Demonstration only: retry this idempotent GET at most twice.
      retry({ count: 2, delay: 500 }),
      catchError((error: unknown) => {
        // Map to a safe domain-level error; do not expose raw server details.
        return throwError(() => new Error('Transaction history is unavailable.'));
      })
    );
  }
}
