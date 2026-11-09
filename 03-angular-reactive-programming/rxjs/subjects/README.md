# Subjects

## Business scenario
A payment operations workspace receives alert events from several UI widgets. A shared stream can multicast alerts to multiple subscribers.

## Subject types

| Type | Behavior | Suitable use |
|---|---|---|
| `Subject<T>` | New subscribers receive future values only | Ephemeral alert/event bus |
| `BehaviorSubject<T>` | Requires and retains a current value | Legacy/current-state stream |
| `ReplaySubject<T>` | Replays a configured buffer to new subscribers | Carefully bounded recent event history |
| `AsyncSubject<T>` | Emits the final value only when completed | Specialized one-result-on-completion workflows |

## Guidance
- Prefer Signals for local synchronous component state.
- Prefer service methods returning Observables for API reads and commands.
- Do not create a global Subject-based event bus by default; it can obscure data flow.
- Avoid unbounded ReplaySubject buffers for high-volume transaction events.
- Never treat client-side alert streams as an audit ledger.

## Example
`operations-alert.service.ts` exposes a read-only Observable while keeping the Subject private.

## Practice
1. Add alert severity and timestamp.
2. Add a bounded ReplaySubject for the last three non-sensitive UI notifications.
3. Explain why exposing a Subject publicly lets consumers emit arbitrary events.
