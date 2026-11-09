# Service and Signals testing

Test the service contract and derived state, not Angular internals.

```ts
it('derives pending count from payment state', () => {
  const service = new PaymentStateService();
  expect(service.pendingCount()).toBe(1);

  service.approve('p-1001');

  expect(service.pendingCount()).toBe(0);
});
```

For services that inject dependencies, configure TestBed and provide controlled fakes. Verify immutability and ensure a failed operation does not corrupt state.
