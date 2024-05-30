import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IUser } from "@models/user.model";
import { FormType } from "@models/form.model";
import { MatCardTitle } from "@angular/material/card";
import { LocalStorageAct } from "@services/localStorageAct";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardTitle,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss',],
})
export class CreateEditUserComponent {
  private readonly fb = inject(FormBuilder);
  public readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  private readonly localStorageAct = inject(LocalStorageAct);

  public isEdit = false;
  private readonly user?: IUser;

  public readonly myFormGroup: FormGroup<FormType<Omit<IUser, 'id'>>> = this.fb.group({
    name: ['', [Validators.required,]],
    username: ['', [Validators.required,]],
    phone: ['', [Validators.required,]],
    email: ['', [Validators.required, Validators.email,]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
  ) {
    this.user = data;

    if(data) {
      this.myFormGroup.patchValue({
        name: this.data.name,
        username: this.data.username,
        phone: this.data.phone,
        email: this.data.email,
      });
    }
  }

  public onDialogClose(): void {
    this.dialogRef.close();
  }

  public onDialogSubmit(): void {
    const user = this.isEdit ? {...this.myFormGroup.value, id: this.user?.id} : {...this.myFormGroup.value, id: Date.now()};

    this.localStorageAct.updateUsers();
    this.dialogRef.close(user);
  }
}
