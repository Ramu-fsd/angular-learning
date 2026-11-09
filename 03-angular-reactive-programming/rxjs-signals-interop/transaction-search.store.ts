import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

export interface TransactionSearchResult {
  readonly id: string;
  readonly maskedReference: string;
  readonly status: string;
}

@Injectable()
export class TransactionSearchStore {
  private readonly http = inject(HttpClient);

  readonly query = signal('');
  private readonly results$ = toObservable(this.query).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => {
      const normalized = query.trim();
      if (normalized.length < 3) {
        return of<readonly TransactionSearchResult[]>([]);
      }

      return this.http.get<readonly TransactionSearchResult[]>('/api/transactions', {
        params: { query: normalized }
      }).pipe(
        catchError(() => of<readonly TransactionSearchResult[]>([]))
      );
    })
  );

  readonly results = toSignal(this.results$, {
    initialValue: [] as readonly TransactionSearchResult[]
  });
}
