import { TestBed } from '@angular/core/testing';
import { PaymentStateService } from './payment-state.service';

describe('PaymentStateService', () => {
  let service: PaymentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentStateService]
    });
    service = TestBed.inject(PaymentStateService);
  });

  it('counts pending payments', () => {
    expect(service.pendingCount()).toBe(2);
  });

  it('approves a pending payment and updates the pending count', () => {
    service.approve('p-1001');

    expect(service.payments().find(payment => payment.id === 'p-1001')?.status).toBe('APPROVED');
    expect(service.pendingCount()).toBe(1);
  });

  it('does not change state for an unknown payment ID', () => {
    const before = service.payments();
    service.approve('missing');

    expect(service.payments()).toEqual(before);
  });
});
