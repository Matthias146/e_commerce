import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressForm } from './billing-address-form';

describe('BillingAddressForm', () => {
  let component: BillingAddressForm;
  let fixture: ComponentFixture<BillingAddressForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingAddressForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingAddressForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
