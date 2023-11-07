import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notice } from '../../models/notice.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Comment } from '@shared/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  private baseUrl = 'https://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Admin
  getAllNotices(): Observable<{ message: string, notices: Notice[] }> {
    return this.http.get<{ message: string, notices: Notice[] }>(this.baseUrl + '/notices/all');
  }

  // Viewer
  getNotices(): Observable<{ message: string, notices: Notice[] }> {
    return this.http.get<{ message: string, notices: Notice[] }>(this.baseUrl + '/notices');
  }

  getNotice(id: string): Observable<{ message: string, notice: Notice }> {
    return this.http.get<{ message: string, notice: Notice }>(this.baseUrl + '/notices/' + id);
  }

  updateNotice(notice: Notice): Observable<{ message: string, notice: Notice }> {
    return this.http.put<{ message: string, notice: Notice }>(this.baseUrl + '/notices/' + notice._id, notice);
  }

  postNotice(notice: Notice): Observable<{ message: string, notice: Notice }> {
    return this.http.post<{ message: string, notice: Notice }>(this.baseUrl + '/notices', notice).pipe(
        tap(response => {
            return response.message;
        }),
        catchError(error => {
            console.error('There was an error!', error);
            return throwError(error);
        })
    );
  }

  deleteNotice(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.baseUrl + '/notices/' + id);
  }

  // Comment
  postComment(notice: Notice, comment: Comment): Observable<{ message: string, comment: Comment }> {
    return this.http.post<{ message: string, comment: Comment }>(this.baseUrl + '/notices/' + notice._id + '/comments', comment).pipe(
        tap(response => {
            return response.message;
        }),
        catchError(error => {
            console.error('There was an error!', error);
            return throwError(error);
        })
    );
  }
}
