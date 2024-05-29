import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    console.log('Dialog dialogData:', this.dialogData);
    if(this.dialogData.user) {
      this.newForm.patchValue(this.dialogData.user);
    }
  }
  
  newForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  createUser() {
    console.log('Creating user with dialogData:', this.newForm.value);
    return this.dialogRef.close(this.newForm.value);
  }

  saveUser() {
    console.log('Saving user with dialogData:', this.newForm.value);
    return this.dialogRef.close(this.newForm.value);
  }

  cancel() {
    console.log('Canceling dialog');
    this.dialogRef.close();
  }
}
