import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModuleComponent } from './activity-module.component';

describe('ActivityModuleComponent', () => {
  let component: ActivityModuleComponent;
  let fixture: ComponentFixture<ActivityModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
