import { Component, OnInit } from '@angular/core';
import { NoticesService } from '@shared/services/notices/notices.service';
import { Notice } from '@models/notice.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewNoticeComponent } from './view-notice/view-notice.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  notices: Notice[] = [];
  search: string = '';
  sortField: string = 'priority'; 
  sortDirection: 'desc' | 'asc' = 'desc';

  private priorityOrder = {
    "low": 1,
    "medium": 2,
    "high": 3,
    "critical": 4
  };

  private statusOrder = {
    "open": 1, 
    "in-progress": 2, 
    "resolved": 3, 
    "closed": 4
  };

  constructor(private noticeService: NoticesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  loadNotices(): void {
    this.noticeService.getAllNotices().subscribe(
      data => this.notices = data.notices,
      error => {
          console.error("Failed to fetch notices", error);
      }
    );
  }

  viewNotice(notice: Notice): void {
    const dialogRef = this.dialog.open(ViewNoticeComponent, {
      data: { notice: notice }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadNotices();
    });
  }

  get filteredNotices() {
    let result = this.notices.filter(notice =>
      notice.title.toLowerCase().startsWith(this.search.toLowerCase())
    );
  
    if (this.sortField) {
      // First, check if sortField is one of the keys in Notice
      const sortFieldKey = this.sortField as keyof Notice;
      
      result = result.sort((a, b) => {
        // Check if we are sorting by 'priority' or 'status'
        if (sortFieldKey === 'priority' || sortFieldKey === 'status') {
          // Map for ordering based on sortFieldKey
          const orderMap = sortFieldKey === 'priority' ? this.priorityOrder : this.statusOrder;
  
          // TypeScript doesn't know if a[sortFieldKey] is a valid key, we need to check this
          const aValue = a[sortFieldKey].toLowerCase();
          const bValue = b[sortFieldKey].toLowerCase();
          
          if (orderMap.hasOwnProperty(aValue) && orderMap.hasOwnProperty(bValue)) {
            const orderA = orderMap[aValue as keyof typeof orderMap];
            const orderB = orderMap[bValue as keyof typeof orderMap];
            return (orderA - orderB) * (this.sortDirection === 'asc' ? 1 : -1);
          }
          // Handle the case where the order is not found
          return 0;
        }
  
        // Default sorting for other fields
        if (a[sortFieldKey] < b[sortFieldKey]) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortFieldKey] > b[sortFieldKey]) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }    
  
    return result;
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
}
