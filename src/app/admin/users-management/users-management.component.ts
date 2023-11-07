import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@shared/models/user.model';
import { UsersService } from '@shared/services/users/users.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'role', 'department', 'options'];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.users;
        this.dataSource.data = this.users;
      },
      error => {
        console.error("Failed to fetch users", error);
      }
    );
  }

  editUser(id: string): void {
    this.userService.getUser(id).subscribe(
      data => {
        var user = data.user;
        this.openEditUserDialog(user);
      },
      error => {
        console.error("Failed to fetch user", error);
      }
    );
  }

  deleteUser(id: string): void {
    this.userService.getUser(id).subscribe(
      data => {
        var user = data.user;
        this.openDeleteUserDialog(user);
      },
      error => {
        console.error("Failed to fetch user", error);
      }
    );
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe((returnedUser: User) => {
      if (returnedUser) {
        this.userService.createUser(returnedUser).subscribe(
          response => {
              console.log('Success!', response);
              this.loadUsers();
          },
          error => {
              console.error('Error occurred:', error);
          }
      );
      } else {
        console.log('Dialog closed without submission');
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '600px',
      data: { user: user }
    });
  
    dialogRef.afterClosed().subscribe((returnedUser: User) => {
      if (returnedUser) {
        this.userService.updateUser(returnedUser).subscribe(
          response => {
              console.log('Success!', response);
              this.loadUsers();
          },
          error => {
              console.error('Error occurred:', error);
          }
      );
      } else {
        console.log('Dialog closed without submission');
      }
    });
  }

  openDeleteUserDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '600px',
      data: { user: user }
    });
  
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data.deletedUser._id) {
        this.userService.deleteUser(data.deletedUser._id).subscribe(
          response => {
              this.userService.updateUserNoticesAfterDelete(data.deletedUser, data.assignedUser).subscribe(
                response => {
                  console.log('Success!', response);
                  this.loadUsers();
                },
                error => {
                  console.error('Error occurred:', error);
                }
              );
          },
          error => {
              console.error('Error occurred:', error);
          }
      );
      } else {
        console.log('Dialog closed without submission');
      }
    });
  }
}
