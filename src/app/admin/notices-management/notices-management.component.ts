import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { Notice } from '@models/notice.model';
import { NoticesService } from '../../shared/services/notices/notices.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNoticeDialogComponent } from './add-notice-dialog/add-notice-dialog.component';
import { EditNoticeDialogComponent } from './edit-notice-dialog/edit-notice-dialog.component';
import { DeleteNoticeDialogComponent } from './delete-notice-dialog/delete-notice-dialog.component';

@Component({
  selector: 'app-notices-management',
  templateUrl: './notices-management.component.html',
  styleUrls: ['./notices-management.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NoticesManagementComponent implements OnInit {
  notices: Notice[] = [];
  dataSource: MatTableDataSource<Notice> = new MatTableDataSource<Notice>();

  displayedColumns: string[] = ['title', 'content', 'departments', 'tags', 'priority', 'status', 'author', 'createdAt', 'options'];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private noticeService: NoticesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadNotices();
    this.dataSource.sort = this.sort;
  }

  loadNotices(): void {
    this.noticeService.getAllNotices().subscribe(
      data => {
        this.notices = data.notices;
        this.dataSource.data = this.notices;
      },
      error => {
        console.error("Failed to fetch notices", error);
      }
    );
  }

  editNotice(id: string): void {
    this.noticeService.getNotice(id).subscribe(
      data => {
        var notice = data.notice;
        this.openEditNoticeDialog(notice);
      },
      error => {
        console.error("Failed to fetch notice", error);
      }
    );
  }

  deleteNotice(id: string): void {
    this.noticeService.getNotice(id).subscribe(
      data => {
        var notice = data.notice;
        this.openDeleteNoticeDialog(notice);
      },
      error => {
        console.error("Failed to fetch notice", error);
      }
    );
  }

  openAddNoticeDialog(): void {
    const dialogRef = this.dialog.open(AddNoticeDialogComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe((returnedNotice: Notice) => {
      if (returnedNotice) {
        this.noticeService.postNotice(returnedNotice).subscribe(
          response => {
              console.log('Success!', response);
              this.loadNotices();
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

  openEditNoticeDialog(notice: Notice): void {
    const dialogRef = this.dialog.open(EditNoticeDialogComponent, {
      width: '600px',
      data: { notice: notice }
    });
  
    dialogRef.afterClosed().subscribe((returnedNotice: Notice) => {
      if (returnedNotice) {
        this.noticeService.updateNotice(returnedNotice).subscribe(
          response => {
              console.log('Success!', response);
              this.loadNotices();
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

  openDeleteNoticeDialog(notice: Notice): void {
    const dialogRef = this.dialog.open(DeleteNoticeDialogComponent, {
      width: '600px',
      data: { notice: notice }
    });
  
    dialogRef.afterClosed().subscribe((_id: string) => {
      if (_id) {
        this.noticeService.deleteNotice(_id).subscribe(
          response => {
              console.log('Success!', response);
              this.loadNotices();
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