import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../models/decoded-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _currentUserRole: string = '';

  private apiUrl = 'https://localhost:3000/api/users';

  constructor(private http: HttpClient, private router: Router) {
    this._currentUserRole = this.getCurrentUserRoleFromToken();
  }

  login(username: string, password: string): void {
    const body = { username, password };
    this.http.post<{ token: string }>(`${this.apiUrl}/login`, body).subscribe(
      response => {
        const decodedToken: DecodedToken = jwtDecode(response.token);
        console.log(decodedToken);
        
        localStorage.setItem('token', response.token);

        const userRole = decodedToken.role;
        this._currentUserRole = userRole;

        if (userRole == "admin") {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/viewer/dashboard']);
        }
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUserRole = '';
    this.router.navigate(['/login']);
  }

  getCurrentUserRoleFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    
    const decodedToken: DecodedToken = jwtDecode(token);
    return decodedToken.role || '';
  }

  // Getter for currentUserRole
  get currentUserRole(): string {
    return this._currentUserRole;
  }

  // Setter for currentUserRole
  set currentUserRole(role: string) {
    this._currentUserRole = role;
  }
}