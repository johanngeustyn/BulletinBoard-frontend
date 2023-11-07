import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ViewerDashboardComponent } from './viewer/viewer-dashboard/viewer-dashboard.component';
import { authenticationGuard } from './shared/guards/authentication.guard';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { roleBasedRedirectGuard } from './shared/guards/role-based-redirect.guard';
import { UsersManagementComponent } from './admin/users-management/users-management.component';
import { NoticesManagementComponent } from './admin/notices-management/notices-management.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '',
    canActivate: [roleBasedRedirectGuard],
    children: []
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authenticationGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'viewer/dashboard',
    component: ViewerDashboardComponent,
    canActivate: [authenticationGuard],
    data: { roles: ['viewer', 'admin'] }
  },
  {
    path: 'admin/dashboard/users',
    component: UsersManagementComponent,
    canActivate: [authenticationGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/dashboard/notices',
    component: NoticesManagementComponent,
    canActivate: [authenticationGuard],
    data: { roles: ['admin'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
