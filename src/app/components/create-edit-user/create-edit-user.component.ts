import { Component, inject, OnInit } from '@angular/core'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose, MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card'

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatFormField, MatInput, MatDialogContent, MatDialogActions,
    MatDialogClose, MatDialogTitle, MatButton, MatCardContent,
    MatLabel, ReactiveFormsModule, MatCard, MatCardHeader,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent implements OnInit {
  private readonly fb = new FormBuilder()
  private readonly dialogRef: MatDialogRef<CreateEditUserComponent> =
    inject(MatDialogRef<CreateEditUserComponent>)
  public data = inject(MAT_DIALOG_DATA)
  public isEdit = this.data.isEdit

  public readonly userForm: FormGroup = this.fb.group({
    id: this.fb.control(null),
    name: this.fb.control('',
      [
        Validators.required, Validators.minLength(3),
        Validators.maxLength(30),
      ]),
    username: this.fb.control('',
      [
        Validators.required, Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    email: this.fb.control('',
      [
        Validators.required, Validators.email,
      ]),
    phone: this.fb.control(null,
      [
        Validators.required, Validators.minLength(3),
        Validators.maxLength(20),
      ]),
  })

  ngOnInit(): void {
    if (this.data.user) {
      this.userForm.patchValue(this.data.user)
    }
  }

  public onSave() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value)
    }
  }

  public onCancel(): void {
    this.dialogRef.close()
  }
}
