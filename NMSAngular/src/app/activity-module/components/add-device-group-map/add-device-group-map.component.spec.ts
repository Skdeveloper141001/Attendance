import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceGroupMapComponent } from './add-device-group-map.component';

describe('AddDeviceGroupMapComponent', () => {
  let component: AddDeviceGroupMapComponent;
  let fixture: ComponentFixture<AddDeviceGroupMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeviceGroupMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeviceGroupMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
