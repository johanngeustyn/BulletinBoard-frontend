import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {
  form = new FormGroup({
    floatLabelControl: new FormControl('auto' as FloatLabelType),
    usernameControl: new FormControl('', [Validators.required]),
    firstNameControl: new FormControl('', [Validators.required]),
    lastNameControl: new FormControl('', [Validators.required]),
    roleControl: new FormControl('', [Validators.required]),
    departmentControl: new FormControl('', [Validators.required]),
    passwordControl: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  
  user = new User();

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) { }

  close(): void {
    this.dialogRef.close(null);
  }

  addUser(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.user);
    }
  }

  getFloatLabelValue(): FloatLabelType {
    return this.form.controls['floatLabelControl'].value || 'auto';
  }  

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Please enter a value';
    } else if (control.hasError('minlength')) {
      const minLengthRequired = control.getError('minlength').requiredLength;
      return `Minimum length required is ${minLengthRequired} characters.`;
    }

    return 'Field not valid';
  }
}
