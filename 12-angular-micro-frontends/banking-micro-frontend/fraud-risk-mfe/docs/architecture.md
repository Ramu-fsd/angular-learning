# Architecture

## UI structure
- `AppComponent` owns the remote's feature views: overview, investigations, alert queue and detection rules.
- Typed interfaces describe cases, alerts and case states.
- Signals hold local case, alert and rule state.
- Computed signals derive open case count, filtered cases and priority cases.
- `app.config.ts` provides router and zone configuration.

## Federation boundary
The application is intended to run independently as the `fraud-risk` remote on port `4205`. The Banking Shell owns top-level navigation and remote loading. The remote owns its fraud operations presentation and feature state.

## Suggested enterprise flow
Browser → Banking Shell → Fraud & Risk Remote → API Gateway → Fraud Case Service / Alert Service / Rules Service → event stream and case database.
