# Banking platform shell architecture

## Responsibilities

The shell owns:
- Global application frame and navigation
- Platform-level layout and responsive behavior
- Entry-point routing
- Shared user/session context boundary
- Remote registration and loading configuration
- Platform-wide error handling and observability integration

Business remotes own their domain UI and domain-specific workflows.

## Logical architecture

```text
Browser
  |
  v
Banking Shell (Host)
  |-- Global navigation
  |-- Platform context
  |-- Remote registry / loader
  |
  +--> Accounts Remote
  +--> Payments Remote
  +--> Customer Remote
  +--> Administration Remote
```

The diagram describes the target architecture. In this first project, remote modules are placeholders; the next projects implement the actual remotes.

## Banking example

- Accounts remote: account search, account profile, balances, statements.
- Payments remote: payment initiation, approval, tracking, exception queue.
- Customer remote: customer profile, relationships, service requests.
- Admin remote: role configuration, operational controls, audit views.

## Backend integration

A remote may call domain APIs directly through an API gateway or use a backend-for-frontend. Authentication and authorization must be enforced by backend services; hiding a menu item is not an authorization control.
