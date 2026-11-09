# Component testing

Use Angular TestBed to configure the component and its dependencies. Assert visible output and interactions.

Example shape:

```ts
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [PaymentStatusComponent]
  }).compileComponents();
});

it('renders the payment reference', () => {
  const fixture = TestBed.createComponent(PaymentStatusComponent);
  fixture.componentRef.setInput('reference', 'PAY-1001');
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('PAY-1001');
});
```

Test user-visible behavior: accessible labels, button disabled state, empty states, and error messages.
