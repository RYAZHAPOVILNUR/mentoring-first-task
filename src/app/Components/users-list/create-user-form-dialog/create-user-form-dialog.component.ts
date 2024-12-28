import {Component, inject} from '@angular/core';
import {MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MyErrorStateMatcher} from "../../utils/error-state-matcher";
import {MatButton} from "@angular/material/button";
import {IUserCreate} from "../../../Interfaces/IUser";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-create-user-form-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatSuffix,
    MatError,
    NgIf,
    MatPrefix,
    MatButton,
    MatDialogClose,
    MatTooltip
  ],
  templateUrl: './create-user-form-dialog.component.html',
  styleUrl: './create-user-form-dialog.component.scss'
})
export class CreateUserFormDialogComponent {
  private readonly dialogRef: MatDialogRef<IUserCreate> = inject(MatDialogRef<CreateUserFormDialogComponent>);

  private fb: FormBuilder = inject(FormBuilder);

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(5)]],
    website: ['', [Validators.required, Validators.minLength(5)]],
    company: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
    }),
  });

  public submitForm(): void {
    this.dialogRef.close(this.form.value);
  }

  // надо разузнать нужен здесь метод для отлавливания ошибки если уже в файле html уже есть mat-error
  // public errorMatcher: MyErrorStateMatcher = new MyErrorStateMatcher();
}
