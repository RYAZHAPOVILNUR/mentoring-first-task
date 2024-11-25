import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';
import { IDataUser } from '../users.interface';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogClose],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  readonly data = inject<IDataUser>(MAT_DIALOG_DATA);
  public isEdit: boolean = this.data.isEdit;

  public createForm = new FormGroup({
    name: new FormControl(
      this._patchValue(this.data).name || '',
      Validators.required
    ),
    email: new FormControl(this._patchValue(this.data).email || '', [
      Validators.required,
      Validators.email,
    ]),
    website: new FormControl(
      this._patchValue(this.data).website || '',
      Validators.required
    ),
    username: new FormControl(
      this._patchValue(this.data).username || '',
      Validators.required
    ),
  });

  private _patchValue(data: any) {
    return data.user || {};
  }

  public get userWithUpdatedFields() {
    if (this.createForm.valid) {
      return {
        ...this.createForm.value,
        id: this.data?.user?.id || null,
      };
    }
    return null;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
