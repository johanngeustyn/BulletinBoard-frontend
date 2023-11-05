import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Notice } from '@models/notice.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-add-notice-dialog',
  templateUrl: './add-notice-dialog.component.html',
  styleUrls: ['./add-notice-dialog.component.scss'] 
})
export class AddNoticeDialogComponent {
  form = new FormGroup({
    floatLabelControl: new FormControl('auto' as FloatLabelType),
    titleControl: new FormControl('', [Validators.required]),
    contentControl: new FormControl('', [Validators.required]),
    departmentsControl: new FormControl('', [Validators.required]),
    priorityControl: new FormControl('', [Validators.required]),
    statusControl: new FormControl('', [Validators.required])
  });
  
  notice = new Notice();
  separatorKeysCodes: number[] = [13, 188];

  constructor(public dialogRef: MatDialogRef<AddNoticeDialogComponent>) { }

  close(): void {
    this.dialogRef.close(null);
  }

  addNotice(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.notice);
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

  autoGrow(event: any): void {
    const element = event.target;
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }

  remove(tag: string): void {
    const index = this.notice.tags.indexOf(tag);

    if (index >= 0) {
      this.notice.tags.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.notice.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }
}
