# HTTP testing

Modern Angular testing uses `provideHttpClient()` and `provideHttpClientTesting()`.

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting()
    ]
  });
  httpTesting = TestBed.inject(HttpTestingController);
});

it('requests the customer list', () => {
  service.getCustomers().subscribe(result => {
    expect(result.length).toBe(1);
  });

  const request = httpTesting.expectOne('/api/customers');
  expect(request.request.method).toBe('GET');
  request.flush([{ id: 7, fullName: 'Demo Customer', email: 'demo@example.test' }]);
});

afterEach(() => httpTesting.verify());
```

Also test 400, 401, 403, 404, 409, 429, and 5xx behavior where relevant. Do not call live backend environments from unit tests.
