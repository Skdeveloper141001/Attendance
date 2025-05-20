import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIPAddressComponent } from './add-ipaddress.component';

describe('AddIPAddressComponent', () => {
  let component: AddIPAddressComponent;
  let fixture: ComponentFixture<AddIPAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddIPAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIPAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
