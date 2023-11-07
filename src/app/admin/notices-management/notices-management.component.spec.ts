import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesManagementComponent } from './notices-management.component';

describe('NoticesManagementComponent', () => {
  let component: NoticesManagementComponent;
  let fixture: ComponentFixture<NoticesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticesManagementComponent]
    });
    fixture = TestBed.createComponent(NoticesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
