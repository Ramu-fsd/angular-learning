import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingUi } from './banking-ui';

describe('BankingUi', () => {
  let component: BankingUi;
  let fixture: ComponentFixture<BankingUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
