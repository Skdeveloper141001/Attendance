import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIPSubnetComponent } from './add-ipsubnet.component';

describe('AddIPSubnetComponent', () => {
  let component: AddIPSubnetComponent;
  let fixture: ComponentFixture<AddIPSubnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddIPSubnetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIPSubnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
