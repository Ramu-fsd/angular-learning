# RxJS Operators

## Business scenario
An operations analyst searches a large payment history. Requests should be debounced, duplicate filter values should be ignored, and stale search requests should be cancelled. Separately, payment commands have ordering and duplicate-submit requirements.

## Operator groups
- Transformation: `map`, `pluck` (legacy), `scan`.
- Filtering: `filter`, `take`, `distinctUntilChanged`.
- Timing: `debounceTime`, `throttleTime`, `auditTime`.
- Combination: `combineLatest`, `forkJoin`, `withLatestFrom`.
- Flattening: `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`.
- Utility: `tap`, `finalize`, `startWith`, `shareReplay` (use intentionally).

## Examples
- `transaction-search.component.ts`: `debounceTime` + `distinctUntilChanged` + `switchMap`.
- `payment-command.service.ts`: illustrates `concatMap` for ordered commands and `exhaustMap` for a single active submit flow.

## Operator selection exercise
For each workflow, explain what should happen if a new event arrives while a previous request is active:
1. Search text changes.
2. Three independent customer risk profiles load.
3. A batch of settlement instructions must preserve order.
4. A user double-clicks Submit.

## Important
`switchMap` cancellation stops the client from observing the previous inner stream; it does not guarantee that a server-side operation already received by the backend is rolled back.
