# Customer Management remote architecture

## Responsibilities

The Customer Management remote owns customer directory search, relationship profile presentation, linked-account references, and service interaction history. It does not own the global banking shell or authentication.

## Components

- `AppComponent`: standalone remote frame.
- `CustomerDashboardComponent`: portfolio metrics, search, filters, and customer cards.
- `CustomerDetailComponent`: profile, linked accounts, and interaction history.
- `CustomersService`: in-memory customer state and selectors.
- `customer.models.ts`: typed customer and interaction contracts.

## Target topology

```text
Banking Shell (dynamic host)
  |
  +-- Customer Management Remote
        |-- Customer directory
        |-- Relationship profile
        |-- Linked account references
        |-- Service interaction history
```

The project is independently runnable. Federation registration is performed after the remote is initialized using the Native Federation schematic.
