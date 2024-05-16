import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatError, MatInputModule } from '@angular/material/input';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserEntity } from '../../entities/UserEntity';

type FormType<T> = {
  [Property in keyof T]: [
    T[Property] | '',
    (Validators | ((control: AbstractControl<any, any>) => ValidationErrors | null))[]
  ]
};

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatError,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    JsonPipe,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  public userForm!: FormGroup;
  public readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  public readonly dialogData: {user: UserEntity, isEdit: boolean} = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.userForm = this.fb.group<FormType<UserEntity>>({
      id: [0, []],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
    });

    if (this.dialogData.user) {
      this.userForm.patchValue(this.dialogData.user)
    }
  }

  public saveUser() {
    this.dialogRef.close();
  }

}
