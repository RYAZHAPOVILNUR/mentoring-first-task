import {
  Component,
  inject
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef
} from "@angular/material/dialog";
import { IUser } from "../../../Interfaces/IUser";
import { MatButton } from "@angular/material/button";
import {
  MatError,
  MatFormField,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-edit-user-form-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    MatTooltip
  ],
  templateUrl: './edit-user-form-dialog.component.html',
  styleUrl: './edit-user-form-dialog.component.scss'
})
export class EditUserFormDialogComponent {
  public data: { user: IUser } = inject<{ user: IUser }>(MAT_DIALOG_DATA);
  public readonly dialogRef: MatDialogRef<IUser> = inject(MatDialogRef<EditUserFormDialogComponent>);
  private fb: FormBuilder = inject(FormBuilder);

  public form = this.fb.group({
    id: [this.data.user.id, Validators.required],
    name: [this.data.user.name, [Validators.required, Validators.minLength(3)]],
    email: [this.data.user.email, [Validators.required, Validators.minLength(3), Validators.email]],
    phone: [this.data.user.phone, [Validators.required, Validators.minLength(5)]],
    website: [this.data.user.website, [Validators.required, Validators.minLength(5)]],
    company: this.fb.group({
      name: [this.data.user.company.name, [Validators.required, Validators.minLength(5)]],
    }),
  });

  submitForm(): void {
    this.dialogRef.close({ ...this.form.value, id: this.data.user.id });
  }
}
