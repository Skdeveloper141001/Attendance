import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActSidebarComponent } from './act-sidebar.component';

describe('ActSidebarComponent', () => {
  let component: ActSidebarComponent;
  let fixture: ComponentFixture<ActSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
