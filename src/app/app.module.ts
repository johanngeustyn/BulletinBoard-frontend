import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ViewerDashboardComponent } from './viewer/viewer-dashboard/viewer-dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { NoticesManagementComponent } from './admin/notices-management/notices-management.component';
import { UsersManagementComponent } from './admin/users-management/users-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddNoticeDialogComponent } from './admin/notices-management/add-notice-dialog/add-notice-dialog.component';
import { EditNoticeDialogComponent } from './admin/notices-management/edit-notice-dialog/edit-notice-dialog.component';
import { DeleteNoticeDialogComponent } from './admin/notices-management/delete-notice-dialog/delete-notice-dialog.component';
import { DeleteUserDialogComponent } from './admin/users-management/delete-user-dialog/delete-user-dialog.component';
import { AddUserDialogComponent } from './admin/users-management/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './admin/users-management/edit-user-dialog/edit-user-dialog.component';
import { ViewNoticeComponent as ViewerViewNoticeComponent } from './viewer/viewer-dashboard/view-notice/view-notice.component';
import { ViewNoticeComponent as AdminViewNoticeComponent } from './admin/admin-dashboard/view-notice/view-notice.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    ViewerDashboardComponent,
    UnauthorizedComponent,
    NoticesManagementComponent,
    UsersManagementComponent,
    AddNoticeDialogComponent,
    EditNoticeDialogComponent,
    DeleteNoticeDialogComponent,
    DeleteUserDialogComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ViewerViewNoticeComponent,
    AdminViewNoticeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline', floatLabel: 'always', hideRequiredMarker: true} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
