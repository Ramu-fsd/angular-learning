# Change Detection

## Business scenario
A payment operations queue receives new statuses while an analyst reviews transactions. Keep UI updates predictable and avoid unnecessary rendering in large component trees.

## Concepts
- Angular checks views to keep the rendered UI synchronized with application state.
- `ChangeDetectionStrategy.OnPush` allows Angular to skip a component subtree until relevant triggers occur, such as changed input references, events in the subtree, or reactive notifications.
- Signals read in an OnPush template notify Angular when their values change.
- Prefer immutable updates for arrays and objects.
- Avoid calling expensive methods repeatedly from templates; use computed values or precomputed view models.
- `markForCheck()` can request a future check when integrating with external mutable APIs, but first prefer a signal or another supported notification mechanism.

## Example
`payment-queue.component.ts` uses OnPush and Signals with immutable updates.

## Practice
1. Add a selected payment detail panel.
2. Compare immutable array replacement with mutating an existing object.
3. Use Angular DevTools to inspect change detection and rendering.
4. Explain why OnPush does not mean a component is checked only once.
