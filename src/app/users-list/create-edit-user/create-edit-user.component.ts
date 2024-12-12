import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IUser } from "../../interface/user";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatDialogClose
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnInit{
  data: {isEdit: boolean, user: IUser} = inject(MAT_DIALOG_DATA)
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);

  form: FormGroup = this.fb.group({
    id: [new Date().getTime(), Validators.required],
    name: ['', Validators.minLength(2)],
    email: ['', Validators.email],
    phone: ['', Validators.required],
    website: ['', Validators.required]
  });

  ngOnInit() {
    this.form.patchValue(this.data.user)
  }

  submitForm() {
    this.dialogRef.close(this.form.value)
  }
}
