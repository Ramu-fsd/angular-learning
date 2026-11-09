# TypeScript Fundamentals for Angular

## Business scenario

A banking frontend receives account and transaction data from backend APIs. Model that data explicitly so that invalid states are harder to represent and UI code is easier to maintain.

## Core concepts

- Primitive types: `string`, `number`, `boolean`.
- Arrays and tuples for collections and fixed-shape values.
- Interfaces for object contracts.
- Union types for finite state values.
- Optional and readonly properties.
- Generics for reusable typed functions and API wrappers.
- Type narrowing with `typeof`, discriminated unions, and guards.
- Classes only where behavior and object identity are useful; do not turn every data model into a class.

## Example: account and transaction models

See `account.models.ts` and `api-response.ts`.

Key design points:
- Store money as integer minor units (for example, paise) or use a well-defined decimal representation. Do not use floating-point arithmetic for financial calculations.
- Use a currency code rather than assuming every amount is INR.
- Model transaction status as a union, not an arbitrary string.
- Mark server-owned identifiers as `readonly` in the frontend model where appropriate.

## Practice tasks

1. Add a `Beneficiary` interface with an ID, display name, masked account reference, and status.
2. Add a `PaymentDraft` type with source account ID, beneficiary ID, amount in paise, and currency.
3. Create a discriminated union for API success and failure.
4. Write a generic `unwrapData<T>()` helper.
5. Add a type guard that identifies failed API responses.

## Interview questions

1. When would you choose `interface` over `type`?
2. What is a discriminated union and why is it useful for API states?
3. Why should financial values not be represented using JavaScript floating-point arithmetic?
4. What is the benefit of generics in an API client?
5. What does `readonly` protect, and what does it not protect at runtime?
