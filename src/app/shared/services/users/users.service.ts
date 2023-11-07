import { Injectable } from '@angular/core';
import { User } from '@shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'https://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<{ message: string, users: User[] }> {
    return this.http.get<{ message: string, users: User[] }>(this.baseUrl + '/users');
  }

  getAdminUsers(): Observable<{ message: string, users: User[] }> {
    return this.http.get<{ message: string, users: User[] }>(this.baseUrl + '/users' + '/admin');
  }

  getUser(id: string): Observable<{ message: string, user: User }> {
    return this.http.get<{ message: string, user: User }>(this.baseUrl + '/users/' + id);
  }

  updateUser(user: User): Observable<{ message: string, user: User }> {
    return this.http.put<{ message: string, user: User }>(this.baseUrl + '/users/' + user._id, user);
  }

  updateUserNoticesAfterDelete(deletedUser: User, assignedUser: User): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(this.baseUrl + '/users/' + deletedUser._id + '/notices', { id: assignedUser._id });
  }

  createUser(user: User): Observable<{ message: string, user: User }> {
    return this.http.post<{ message: string, user: User }>(this.baseUrl + '/users', user).pipe(
        tap(response => {
            return response.message;
        }),
        catchError(error => {
            console.error('There was an error!', error);
            return throwError(error);
        })
    );
  }

  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.baseUrl + '/users/' + id);
  }
}
