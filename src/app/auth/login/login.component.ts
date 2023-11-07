import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  user = new User();

  constructor(private authService: AuthenticationService) { }

  onLogin(): void {
    this.authService.login(this.user.username, this.user.password);
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Please enter a value';
    }

    return 'Field not valid';
  }
}