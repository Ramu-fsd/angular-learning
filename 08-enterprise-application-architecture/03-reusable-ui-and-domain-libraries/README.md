# Reusable UI and domain libraries

Separate visual reuse from business reuse.

- Design-system library: buttons, tables, dialogs, form controls, tokens.
- Shared utility library: date/number formatting, generic helpers.
- Domain library: payment status rules or customer eligibility models, owned by a business domain.
- Feature library: pages and workflows for a bounded capability.

Avoid a generic `shared` library that becomes a dumping ground. Define public APIs and enforce dependency direction.
