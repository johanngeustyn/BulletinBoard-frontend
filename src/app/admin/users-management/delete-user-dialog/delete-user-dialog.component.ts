import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent {
  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteUserDialogComponent>) {
    this.user = data.user;
  }

  close(): void {
    this.dialogRef.close(null);
  }

  deleteUser(): void {
    this.dialogRef.close(this.user._id);
  }
}
