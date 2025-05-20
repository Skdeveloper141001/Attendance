import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModuleComponent } from './layout-module.component';

describe('LayoutModuleComponent', () => {
  let component: LayoutModuleComponent;
  let fixture: ComponentFixture<LayoutModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
