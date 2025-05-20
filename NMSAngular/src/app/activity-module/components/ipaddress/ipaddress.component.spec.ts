import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IPAddressComponent } from './ipaddress.component';

describe('IPAddressComponent', () => {
  let component: IPAddressComponent;
  let fixture: ComponentFixture<IPAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IPAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IPAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
