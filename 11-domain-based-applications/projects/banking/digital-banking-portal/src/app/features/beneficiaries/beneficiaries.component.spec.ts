import { TestBed } from '@angular/core/testing';
import { BeneficiariesComponent } from './beneficiaries.component';
import { BankingDataService } from '../../core/banking-data.service';

describe('BeneficiariesComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [BeneficiariesComponent] }));

  it('adds a beneficiary in pending verification state', () => {
    const fixture = TestBed.createComponent(BeneficiariesComponent);
    fixture.detectChanges();
    const service = TestBed.inject(BankingDataService);
    const before = service.beneficiaries().length;
    service.addBeneficiary({ name: 'Example Payee', bankName: 'Example Bank', accountNumber: '123456789012' });
    expect(service.beneficiaries().length).toBe(before + 1);
    expect(service.beneficiaries()[0].status).toBe('PENDING_VERIFICATION');
    expect(service.beneficiaries()[0].maskedAccount).toBe('•••• 9012');
  });
});
