import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../interfaces/user';

@Component({
  selector: 'create-edit-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUser {

  constructor(
    public dialogRef: MatDialogRef<CreateEditUser>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, isEdit: boolean, },
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.formUser.value)
  }

  public readonly formUser = new FormGroup({
    id: new FormControl(this.data.user?.id || new Date().getTime()),
    name: new FormControl(this.data.user?.name || '', [Validators.required]),
    email: new FormControl(this.data.user?.email || '', [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl(this.data.user?.phone || '', [
      Validators.required, 
      Validators.pattern('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'),
    ]),
  })

}
