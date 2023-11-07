import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  form = new FormGroup({
    floatLabelControl: new FormControl('auto' as FloatLabelType),
    usernameControl: new FormControl('', [Validators.required]),
    firstNameControl: new FormControl('', [Validators.required]),
    lastNameControl: new FormControl('', [Validators.required]),
    roleControl: new FormControl('', [Validators.required]),
    departmentControl: new FormControl('', [Validators.required])
  });
  
  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditUserDialogComponent>) {
    this.user = data.user;
  }

  close(): void {
    this.dialogRef.close(null);
  }

  editUser(): void {
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
    }

    return 'Field not valid';
  }
}
