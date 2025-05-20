import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupMapComponent } from './device-group-map.component';

describe('DeviceGroupMapComponent', () => {
  let component: DeviceGroupMapComponent;
  let fixture: ComponentFixture<DeviceGroupMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceGroupMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceGroupMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
