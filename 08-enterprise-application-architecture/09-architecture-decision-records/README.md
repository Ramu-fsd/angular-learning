# Architecture Decision Records (ADRs)

Use short ADRs to record why an architecture choice was made.

Suggested format:

```text
# ADR-001: Choose feature-based Angular architecture

Status: Accepted
Date: YYYY-MM-DD

## Context
The banking portal has customer, account, payment, and operations capabilities.

## Decision
Organize code by business feature and lazy-load route trees.

## Alternatives
- Technical-layer folders
- Micro-frontends from day one

## Consequences
- Clearer ownership and feature isolation
- Requires dependency boundary discipline
- Micro-frontends can be introduced later if independent deployment becomes necessary
```

Create ADRs for state management, identity integration, API gateway contracts, monorepo adoption, and micro-frontends.
