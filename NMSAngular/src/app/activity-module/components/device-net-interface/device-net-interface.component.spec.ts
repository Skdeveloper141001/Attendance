import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceNetInterfaceComponent } from './device-net-interface.component';

describe('DeviceNetInterfaceComponent', () => {
  let component: DeviceNetInterfaceComponent;
  let fixture: ComponentFixture<DeviceNetInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceNetInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceNetInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
