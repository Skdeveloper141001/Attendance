import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceNetInterfaceComponent } from './add-device-net-interface.component';

describe('AddDeviceNetInterfaceComponent', () => {
  let component: AddDeviceNetInterfaceComponent;
  let fixture: ComponentFixture<AddDeviceNetInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeviceNetInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeviceNetInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
