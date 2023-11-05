import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notice } from '@shared/models/notice.model';

@Component({
  selector: 'app-delete-notice-dialog',
  templateUrl: './delete-notice-dialog.component.html',
  styleUrls: ['./delete-notice-dialog.component.scss']
})
export class DeleteNoticeDialogComponent {
  notice: Notice;
  separatorKeysCodes: number[] = [13, 188];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteNoticeDialogComponent>) {
    this.notice = data.notice;
  }

  close(): void {
    this.dialogRef.close(null);
  }

  deleteNotice(): void {
    this.dialogRef.close(this.notice._id);
  }
}
