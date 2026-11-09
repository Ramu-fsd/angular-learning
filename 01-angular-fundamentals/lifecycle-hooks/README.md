# Component Lifecycle Hooks

## Business scenario

A customer profile panel receives a customer ID from its parent, loads profile information when the ID changes, and cancels the previous request when the component is destroyed or a new ID arrives.

## Lifecycle hooks to understand

- `ngOnChanges`: runs when input values change; runs before `ngOnInit` for initial input changes.
- `ngOnInit`: one-time initialization after initial input values are set.
- `ngDoCheck`: custom change detection; use sparingly because it can run frequently.
- `ngAfterContentInit` / `ngAfterContentChecked`: projected content lifecycle.
- `ngAfterViewInit` / `ngAfterViewChecked`: view lifecycle.
- `ngOnDestroy`: cleanup before destruction.
- `DestroyRef` and `takeUntilDestroyed`: modern cleanup options that reduce manual subscription management.

## Example

See `customer-profile.component.ts`. It uses `input`, `effect`, and `DestroyRef` to react to a changing customer ID and cancel an earlier request. The API method is represented by a small injectable service in the example to keep the lifecycle behavior focused.

## Practice

1. Add a loading state.
2. Handle an API error without exposing internal server details.
3. Explain why `ngAfterViewChecked` is not a place for expensive work.
4. Compare `takeUntilDestroyed` with a manually managed `Subject`.
