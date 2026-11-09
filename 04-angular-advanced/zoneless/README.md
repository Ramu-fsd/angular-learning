# Zoneless Angular

## Business scenario
A high-volume payment operations portal needs predictable rendering without relying on Zone.js patching of asynchronous browser APIs.

## Concepts
- Angular supports zoneless change detection in modern releases; check the exact API and stability status for your installed Angular version.
- In Angular versions where `provideZonelessChangeDetection()` is supported, it can be configured at application bootstrap.
- Signals, template listeners, and Angular-supported notification mechanisms inform Angular when UI state needs checking.
- Third-party libraries that mutate state outside Angular may need an adapter or explicit notification.
- Zoneless is not a performance switch that automatically fixes inefficient templates or large DOM trees.

## Configuration example
See `provide-zoneless.config.ts`. Add the provider only if your Angular version supports it. If your CLI-generated workspace still uses Zone.js, follow that release's official migration guidance rather than copying this provider blindly.

## Practice
1. Run the payment console with the standard change-detection configuration.
2. Profile a list update.
3. If supported by your installed release, enable zoneless mode and repeat the same profiling.
4. Compare bundle size, change-detection behavior, and third-party library compatibility.
