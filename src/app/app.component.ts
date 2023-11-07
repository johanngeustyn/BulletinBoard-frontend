import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication/authentication.service'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showToolbar = true;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.showToolbar = event.url !== '/login';
    });    
  }

  onLogout() {
    this.authService.logout();
  }

  get isAdmin(): boolean {
    return this.authService.currentUserRole === 'admin';
  }
  
}
