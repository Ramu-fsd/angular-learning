# Banking platform architecture

## Logical composition

```text
                         Browser
                            |
                     Banking Host (4200)
                            |
                  Native Federation Runtime
       _____________________|_____________________
      |          |          |          |          |
  Accounts   Payments   Customers    Admin    Fraud & Risk
   4201       4202       4203        4204       4205
      |          |          |          |          |
      +----------+----------+----------+----------+
                            |
                       API Gateway
                            |
          Banking domain microservices and APIs
                            |
          Databases / event streams / audit services
```

## Ownership boundaries
- Host: navigation, remote discovery, application composition and global error handling.
- Domain remote: domain-specific UI, local state and domain workflow presentation.
- Shared UI library: reusable presentation components and design tokens.
- Backend: authentication, authorization, business rules, data access and audit enforcement.

## Deployment
Deploy the host and each remote independently. Use environment-specific remote manifests or equivalent runtime configuration. Keep remote entry URLs configurable per environment rather than hardcoding production endpoints into application source.
