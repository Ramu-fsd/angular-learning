# RxJS and asynchronous testing

Use controlled observables and fake dependencies. Test:
- Loading -> success.
- Loading -> error.
- Cancellation of stale search requests.
- Retry limits and backoff behavior.
- Subscription/resource cleanup.
- Race conditions when users change filters quickly.

Choose `switchMap`, `concatMap`, `mergeMap`, and `exhaustMap` according to the business semantics, then test those semantics.
