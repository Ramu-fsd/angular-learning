# Angular Projects Catalog

This catalog describes the purpose and suggested validation scenarios for the eight existing projects. Keep project-specific details aligned with the actual implementation.

## Beginner

### 01. Angular Counter App
**Business framing:** A simple operations counter for tracking reviewed work items.

**Validate**
- Increment and decrement actions update the displayed count.
- Reset returns to the initial value.
- Boundary behavior is intentional and documented.
- Keyboard interaction works for all controls.

### 02. Angular Login Form
**Business framing:** A sign-in form for an internal banking operations portal.

**Validate**
- Required fields show clear validation feedback.
- Email format is validated.
- Password visibility behavior works if implemented.
- Submit is disabled or rejected for invalid input.
- Demo authentication is clearly labelled; never present client-only checks as production security.

### 03. Angular Stopwatch App
**Business framing:** An operations task timer used to measure case-handling duration.

**Validate**
- Start, pause, resume, and reset behave correctly.
- Repeated start actions do not create duplicate timers.
- Timer resources are cleaned up when the component is destroyed.
- Display precision and time formatting are consistent.

### 04. Angular Todo App
**Business framing:** A task list for KYC or onboarding case follow-ups.

**Validate**
- Create, edit, complete, and delete tasks.
- Empty and invalid task inputs are handled.
- Completed and pending tasks are distinguishable.
- Persistence behavior, if present, is documented.

## Intermediate

### 05. Angular Dashboard App
**Business framing:** A banking operations dashboard showing workflow and service indicators.

**Validate**
- Summary cards display consistent values.
- Empty, loading, and error states are handled if data is remote.
- Responsive layout works at desktop and mobile widths.
- Charts include labels and accessible descriptions.

### 06. Angular Product Catalog
**Business framing:** A merchant or banking partner product catalog.

**Validate**
- Product list renders with meaningful empty state.
- Search, category filters, and sorting work if implemented.
- Product detail navigation works.
- API failures do not leave a permanent loading indicator.

### 07. Angular Search Filter
**Business framing:** Search transactions, customers, or operational cases.

**Validate**
- Search matches the intended fields.
- Clearing the query restores the full result set.
- Filter combinations behave predictably.
- Large result sets remain responsive; consider debouncing remote searches.

## Advanced

### 08. Angular E-commerce App
**Business framing:** A realistic commerce workflow with catalog, cart, and checkout.

**Validate**
- Add/remove/update cart items.
- Quantities and totals remain consistent.
- Invalid checkout input is rejected.
- Navigation and refresh behavior are understood.
- Do not treat browser-calculated totals as authoritative; backend must recalculate price, tax, inventory, and payment eligibility.
