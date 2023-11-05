import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoticeDialogComponent } from './delete-notice-dialog.component';

describe('DeleteNoticeDialogComponent', () => {
  let component: DeleteNoticeDialogComponent;
  let fixture: ComponentFixture<DeleteNoticeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteNoticeDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteNoticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
