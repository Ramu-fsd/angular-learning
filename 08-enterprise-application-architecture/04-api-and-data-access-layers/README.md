# API and data-access layers

A maintainable frontend separates presentation from transport and mapping.

```text
Page Component
   -> Feature Facade / Feature State
      -> Data Access Service
         -> HttpClient
            -> API Gateway / Spring Boot
```

Recommendations:
- Keep API URLs and HTTP details out of components.
- Map backend DTOs to frontend view models where shapes differ.
- Centralize correlation IDs and normalized error handling.
- Avoid duplicating server data in several unrelated global stores.
- Treat frontend data as a view/cache, never the financial system of record.
