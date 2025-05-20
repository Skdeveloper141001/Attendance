import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IPSubnetComponent } from './ipsubnet.component';

describe('IPSubnetComponent', () => {
  let component: IPSubnetComponent;
  let fixture: ComponentFixture<IPSubnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IPSubnetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IPSubnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
