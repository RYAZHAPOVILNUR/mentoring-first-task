import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from "@angular/material/dialog";
import { Store } from '@ngrx/store';
import { User } from '@app/models/user.interface';
import * as UserActions from "@store/actions/user.actions";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnInit {
  public readonly dialogData = inject(MAT_DIALOG_DATA);
  public readonly dialogRef: MatDialogRef<CreateEditUserComponent> = inject(MatDialogRef<CreateEditUserComponent>);
  public readonly isEdit: boolean = this.dialogData.isEdit;
  private readonly store = inject(Store);
  
  public newForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    if (this.dialogData.user) {
      this.newForm.patchValue(this.dialogData.user);
    }
  }

  public createUser() {
    // return this.dialogRef.close(this.newForm.value);
    const user: User = this.newForm.value as User;
    this.store.dispatch(UserActions.addUser({ user }));
    this.dialogRef.close();
  }

  public saveUser() {
    // return this.dialogRef.close(this.newForm.value);
    const user: User = this.newForm.value as User;
    this.store.dispatch(UserActions.updateUser({ user }));
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}