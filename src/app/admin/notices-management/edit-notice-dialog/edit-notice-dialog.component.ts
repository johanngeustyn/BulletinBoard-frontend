import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { Notice } from '@shared/models/notice.model';

@Component({
  selector: 'app-edit-notice-dialog',
  templateUrl: './edit-notice-dialog.component.html',
  styleUrls: ['./edit-notice-dialog.component.scss']
})
export class EditNoticeDialogComponent {
  form = new FormGroup({
    floatLabelControl: new FormControl('auto' as FloatLabelType),
    titleControl: new FormControl('', [Validators.required]),
    contentControl: new FormControl('', [Validators.required]),
    departmentsControl: new FormControl('', [Validators.required]),
    priorityControl: new FormControl('', [Validators.required]),
    statusControl: new FormControl('', [Validators.required])
  });
  
  notice: Notice;
  separatorKeysCodes: number[] = [13, 188];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditNoticeDialogComponent>) {
    this.notice = data.notice;
  }

  close(): void {
    this.dialogRef.close(null);
  }

  editNotice(): void {
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
