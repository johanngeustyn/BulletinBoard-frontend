import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@shared/models/user.model';
import { UsersService } from '@shared/services/users/users.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit{
  user: User;
  adminUsers: User[] = [];
  assignedUser: User = new User();

  adminUsersControl = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteUserDialogComponent>, private userService: UsersService) {
    this.user = data.user;
  }
  
  ngOnInit(): void {
    if (this.user.role === 'admin') {
      this.userService.getAdminUsers().subscribe(
        data => {
          this.adminUsers = data.users;
        },
        error => {
          console.error("Failed to fetch users", error);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }

  deleteUser(): void {
    this.dialogRef.close({ deletedUser: this.user, assignedUser: this.assignedUser });
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Please enter a value';
    }

    return 'Field not valid';
  }
}
