# Frontend system design fundamentals

A frontend system design begins with user journeys and measurable requirements, not a component diagram.

## Design checklist

- Personas and critical workflows.
- Functional requirements and out-of-scope items.
- Browser/device support.
- Peak concurrent users and traffic patterns.
- API latency and payload sizes.
- Availability, performance, accessibility, and security.
- Data freshness and consistency.
- Release strategy and team ownership.

## Typical architecture

```text
Browser
  -> CDN / WAF
  -> Static Angular assets
  -> Identity Provider (OIDC)
  -> API Gateway / BFF
  -> Domain APIs (Spring Boot)
  -> Databases / Event platform
```

Keep the frontend responsible for presentation and user interaction. Backend services remain authoritative for financial rules, entitlements, and data.
