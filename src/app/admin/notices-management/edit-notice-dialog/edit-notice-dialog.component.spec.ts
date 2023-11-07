import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoticeDialogComponent } from './edit-notice-dialog.component';

describe('EditNoticeDialogComponent', () => {
  let component: EditNoticeDialogComponent;
  let fixture: ComponentFixture<EditNoticeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNoticeDialogComponent]
    });
    fixture = TestBed.createComponent(EditNoticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
