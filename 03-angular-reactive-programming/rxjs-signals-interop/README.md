# RxJS and Signals Interoperability

## Business scenario
A transaction dashboard has a Signal-based search field. Search changes are converted to an Observable, debounced, and used to query a backend. The response is exposed back to the template as a Signal.

## Concepts
- `toObservable(signal)` emits signal values through RxJS.
- `toSignal(observable)` subscribes and exposes the latest value as a Signal.
- `toSignal` should be created in an injection context or supplied an injector.
- Provide an `initialValue` when the stream may not emit immediately.
- `toSignal` automatically cleans up with its owning injection context by default.
- Avoid repeatedly calling `toSignal` for the same Observable.
- `rxResource` may be useful for resource-oriented async state in Angular versions that support it; check its stability status in your installed release.

## Example
`transaction-search.store.ts` shows a search Signal converted into an Observable request stream and then back to a Signal.

## Practice
1. Add loading and error states.
2. Add a status filter using `combineLatest`.
3. Explain when a plain computed Signal is enough and when RxJS is more appropriate.
