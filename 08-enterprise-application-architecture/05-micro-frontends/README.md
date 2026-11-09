# Micro-frontends

Micro-frontends can allow independently owned frontend teams to build and deploy parts of a product separately. They also add runtime, dependency, observability, and integration complexity.

Consider them when:
- Multiple teams own clear business capabilities.
- Independent deployment is a real requirement.
- Teams can define stable contracts and compatible design-system versions.
- Runtime integration and operational ownership are funded.

Avoid them when:
- One team owns the entire application.
- A modular monolith with lazy routes is sufficient.
- Independent deployment is not required.
- Shared dependencies and cross-app navigation would create more coupling than they remove.

Evaluate module federation against your Angular version and build tooling; do not assume all plugin versions are interchangeable.
