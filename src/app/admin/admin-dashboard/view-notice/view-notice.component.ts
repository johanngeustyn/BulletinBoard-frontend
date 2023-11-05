import { Component, Inject } from '@angular/core';
import { Notice } from '@shared/models/notice.model';
import { Comment } from '@shared/models/comment.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoticesService } from '@shared/services/notices/notices.service';

@Component({
  selector: 'app-view-notice',
  templateUrl: './view-notice.component.html',
  styleUrls: ['./view-notice.component.scss']
})
export class ViewNoticeComponent {
  notice: Notice;
  comment = new Comment();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ViewNoticeComponent>, private noticeService: NoticesService) {
    this.notice = data.notice;
    console.log(this.notice);
  }

  addComment(): void {
    if (this.comment) {
      this.noticeService.postComment(this.notice, this.comment).subscribe(
        response => {
            console.log('Success!', response);
            this.reloadNotice();
            this.comment = new Comment();
        },
        error => {
            console.error('Error occurred:', error);
        }
    );
    } else {
      console.log('Dialog closed without submission');
    }
  }

  reloadNotice(): void {
    this.noticeService.getNotice(this.notice._id).subscribe(
      response => {
          this.notice = response.notice;
      },
      error => {
          console.error('Error occurred:', error);
      }
    );
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low':
        return 'low-priority';
      case 'medium':
        return 'medium-priority';
      case 'high':
        return 'high-priority';
      case 'critical':
        return 'critical-priority';
      default:
        return '';
    }
  }

  autoGrow(event: any): void {
    const element = event.target;
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }
}
