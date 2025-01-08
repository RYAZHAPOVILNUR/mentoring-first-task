import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector:'app-create-user-dialog',
  templateUrl:'./create-edit-user-dialog.component.html',
  styleUrl:'./create-edit-user-dialog.component.scss',
  imports:[ReactiveFormsModule, MatDialogClose, MatInputModule, MatFormFieldModule, MatButtonModule],
  standalone: true,
})
export class CreateEditUserDialogComponent{
  public readonly data = inject(MAT_DIALOG_DATA)
  private readonly dialogRef = inject(MatDialogRef<CreateEditUserDialogComponent>);

  @Output()
  isEditable = new EventEmitter();

  public form = new FormGroup({
    name: new FormControl(this.data?.user?.name, [Validators.required]),
    email:new FormControl(this.data?.user?.email, [Validators.required, Validators.email]),
    website:new FormControl(this.data?.user?.website, [Validators.required, Validators.minLength(3)]),
    companyName:new FormControl(this.data?.user?.company.name, [Validators.required]),
  })

  public editUser() {
    this.dialogRef?.close(this.form.value)
  }
}