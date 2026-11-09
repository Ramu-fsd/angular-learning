# 03 – Angular Reactive Programming

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This module teaches RxJS and Angular Signals through realistic banking and payment workflows: transaction search, payment-status updates, fraud alerts, and dashboard state.

## Learning objectives

- Understand Observable execution, subscription, completion, and teardown.
- Choose between Observable, Subject, BehaviorSubject, ReplaySubject, and AsyncSubject.
- Compose streams using transformation, filtering, combination, flattening, and timing operators.
- Select `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap` based on business semantics.
- Handle errors without accidentally terminating long-lived UI streams.
- Use Angular Signals for synchronous reactive UI state.
- Interoperate between Signals and RxJS using `toSignal` and `toObservable`.

## Folder guide

| Folder | Topics | Business example |
|---|---|---|
| `rxjs/observables` | Observable lifecycle, subscription, teardown, async pipe | Payment status stream |
| `rxjs/subjects` | Subject variants and multicasting | Operations alert feed |
| `rxjs/operators` | map, filter, debounceTime, distinctUntilChanged, switchMap, mergeMap, concatMap, exhaustMap | Transaction search and payment commands |
| `rxjs/error-handling` | catchError, retry, finalize, timeout, cancellation | Resilient account/transaction reads |
| `signals` | signal, computed, effect, input/output signals | Payment dashboard view state |
| `rxjs-signals-interop` | toSignal, toObservable, rxResource concepts | Search filters driving API requests |

## Compatibility

Use a currently supported Angular version and its matching RxJS version. Examples use modern standalone Angular APIs and `@angular/core/rxjs-interop`. Check the installed Angular version's documentation if an API differs.

## Core mental models

- An Observable is a lazy description of a stream; many Observables start work when subscribed.
- A subscription represents an active execution and should be cleaned up when its owner no longer needs it.
- Subjects are both Observers and Observables; use them when multicasting or bridging imperative events is genuinely required.
- Operators describe transformations and orchestration; flattening operators encode concurrency policy.
- Signals represent synchronous reactive state and are particularly useful for component view state.
- RxJS and Signals solve related but different problems. Do not convert everything to one abstraction.

## Choosing flattening operators

| Operator | Behavior | Example |
|---|---|---|
| `switchMap` | Unsubscribe from previous inner stream when a new source value arrives | Search-as-you-type; latest filter wins |
| `mergeMap` | Run inner streams concurrently | Load independent customer risk summaries |
| `concatMap` | Queue inner streams and run one at a time in order | Process an ordered command queue |
| `exhaustMap` | Ignore new source values while current inner stream is active | Prevent duplicate submit clicks |

**Payment safety:** client-side operator choice does not provide financial idempotency or exactly-once processing. The backend must enforce idempotency, authorization, limits, and durable transaction state.

## How to use

These are learning modules, not a standalone Angular CLI workspace. Add examples to a compatible workspace, configure `provideHttpClient()` where needed, and adjust imports to your project structure. Each folder contains focused notes and code examples.

## Interview checkpoints

1. Observable vs Promise.
2. Cold vs hot Observable.
3. Subject vs BehaviorSubject vs ReplaySubject.
4. What happens when `switchMap` receives a new value?
5. Why can retrying a payment POST be dangerous?
6. `catchError` placement inside vs outside `switchMap`.
7. Signal vs Observable.
8. `toSignal` initial values and subscription lifecycle.
9. Why should effects not be used for derived state?
10. How do you prevent memory leaks in Angular streams?

## Completion checklist

- [ ] Explain Observable lifecycle and teardown.
- [ ] Demonstrate Subject variants.
- [ ] Choose the correct flattening operator for a business workflow.
- [ ] Handle errors and cancellation.
- [ ] Build a dashboard using Signals and computed state.
- [ ] Bridge RxJS and Signals without duplicate subscriptions.
