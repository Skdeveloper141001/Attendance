import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceinfoComponent } from './add-deviceinfo.component';

describe('AddDeviceinfoComponent', () => {
  let component: AddDeviceinfoComponent;
  let fixture: ComponentFixture<AddDeviceinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeviceinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeviceinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
