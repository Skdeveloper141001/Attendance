import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceLocationComponent } from './add-device-location.component';

describe('AddDeviceLocationComponent', () => {
  let component: AddDeviceLocationComponent;
  let fixture: ComponentFixture<AddDeviceLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeviceLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeviceLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
