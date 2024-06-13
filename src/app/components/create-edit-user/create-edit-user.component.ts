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
  public readonly dialogRef = inject<MatDialogRef<CreateEditUserComponent>>(MatDialogRef);
  public readonly isEdit: boolean = this.dialogData.isEdit;

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

  public createUser(): void {
    const user = {...this.newForm.value, id: new Date().getTime()};
    this.dialogRef.close(user);
  }

  public saveUser(): void {
    const user = this.newForm.value;
    this.dialogRef.close(user);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}