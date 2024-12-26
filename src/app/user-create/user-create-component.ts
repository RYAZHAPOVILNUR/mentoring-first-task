import {
    ChangeDetectionStrategy,
    Component,
    inject,
  } from '@angular/core';
  import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import {
    MAT_DIALOG_DATA,
    MatDialogClose,
    MatDialogRef,
  } from '@angular/material/dialog';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { NgIf } from '@angular/common';
  import { User } from '../interface/user.interface';
  
  @Component({
    selector: 'app-user-create',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatDialogClose,
      NgIf,
    ],
    templateUrl: './user-create.component.html',
    styleUrl: './user-create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class UserCreateComponent {
    public readonly dialogRef = inject(MatDialogRef<UserCreateComponent>);
    private readonly data = inject<{ isEdit: boolean; user: User }>(
      MAT_DIALOG_DATA
    );
  
    public readonly isEdit: boolean = this.data.isEdit;
  
    public formUsers = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  
    get userWithUpdateFields(): {} {
      return {
        ...this.formUsers.value,
        id: this.data.user?.id ?? new Date().getTime(),
      };
    }
  
    onCancel(): void {
      if (this.isEdit && this.data.user) {
        this.formUsers.setValue({
          name: this.data.user.name,
          email: this.data.user.email,
          username: this.data.user.username,
          phone: this.data.user.phone,
        });
      } else {
        this.formUsers.reset();
      }
      this.dialogRef.close();
    }
  
    public submitForm(): void {
      if (this.formUsers.valid) {
        this.dialogRef.close(this.userWithUpdateFields);
      }
    }
  }
  