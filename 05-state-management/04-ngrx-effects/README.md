# NgRx Effects: asynchronous workflows

Reducers must remain synchronous and side-effect free. Effects handle HTTP requests, navigation, notifications, and other asynchronous work.

## Example: load account transactions

```ts
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const loadTransactions = createAction('[Transactions] Load');
export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Success',
  props<{ transactions: Transaction[] }>()
);
export const loadTransactionsFailure = createAction(
  '[Transactions] Load Failure',
  props<{ message: string }>()
);

export interface Transaction {
  id: string;
  reference: string;
  amount: number;
}

export const loadTransactionsEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) =>
    actions$.pipe(
      ofType(loadTransactions),
      switchMap(() =>
        http.get<Transaction[]>('/api/accounts/transactions').pipe(
          map(transactions => loadTransactionsSuccess({ transactions })),
          catchError(() => of(loadTransactionsFailure({
            message: 'Unable to load transactions. Please retry.'
          })))
        )
      )
    ),
  { functional: true }
);
```

Register effects using the NgRx APIs supported by the installed version, for example `provideEffects(loadTransactionsEffect)` in a standalone bootstrap configuration.

## Important

Choose the flattening operator based on the business behavior:
- `switchMap`: latest request wins (e.g. search-as-you-type).
- `concatMap`: preserve order (e.g. sequential commands).
- `mergeMap`: allow concurrency (independent requests).
- `exhaustMap`: ignore duplicate triggers while one request is active (e.g. submit button).

Never silently swallow errors; expose an actionable error state.
