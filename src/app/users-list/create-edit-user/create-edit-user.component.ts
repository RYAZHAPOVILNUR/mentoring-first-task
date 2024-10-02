import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../interfaces/iuser";
import { v4 as uuidv4 } from 'uuid';
import {Store} from "@ngrx/store";
import {addUser, updateUser} from "../../states/users/users.actions";
@Component({
  selector: 'create-edit-user',
  templateUrl: './create-edit-user.component.html',
  standalone: true,
  imports: [
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    NgIf,
    MatInput,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatLabel,
    MatError
  ],
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent {
  createEditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { user: IUser; isEdit: boolean }
  ) {
    this.createEditForm = this.fb.group({
      name: [data?.user?.name || '', Validators.required],
      email: [data?.user?.email || '', [Validators.required, Validators.email]],
      company: this.fb.group({
        name: [data?.user?.company?.name || '', Validators.required],
      })
    });
  }

  submitForm(): void {
    if (this.createEditForm.valid) {
      const user = this.createEditForm.value;

      if (this.data.isEdit && this.data.user.id) {
        user.id = this.data.user.id;
        this.store.dispatch(updateUser({ user }));
      } else {
        user.id = uuidv4();
        this.store.dispatch(addUser({ user }));
      }

      this.dialogRef.close({ user, isEdit: this.data.isEdit });
    }
  }



}
