# Reactive forms connected to Spring Boot

Use reactive forms for customer onboarding and account maintenance. The frontend provides immediate feedback, while Spring Boot validates the request again.

Example request model:

```ts
export interface CreateCustomerRequest {
  fullName: string;
  email: string;
}
```

Recommended workflow:
1. Build a typed `FormGroup`.
2. Add required, length, and email validators.
3. Disable submit while invalid or while a request is pending.
4. Send a typed request through an API service.
5. Display field-level server validation errors.
6. Reset or navigate only after a successful response.

Never rely on browser validation alone. A caller can bypass the Angular UI and invoke the API directly.
