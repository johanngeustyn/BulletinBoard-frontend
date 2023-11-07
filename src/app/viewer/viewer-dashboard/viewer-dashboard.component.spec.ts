import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerDashboardComponent } from './viewer-dashboard.component';

describe('ViewerDashboardComponent', () => {
  let component: ViewerDashboardComponent;
  let fixture: ComponentFixture<ViewerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewerDashboardComponent]
    });
    fixture = TestBed.createComponent(ViewerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
