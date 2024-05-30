import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../interface/users.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-user-edit',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf ],
  templateUrl: './create-user-edit.component.html',
  styleUrl: './create-user-edit.component.scss',
})
export class CreateUserEditComponent implements OnInit{
  userForm: FormGroup;
  isEdit: boolean
  constructor(
    private dialogRef: MatDialogRef<CreateUserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User, isEdit: boolean},
    private fb: FormBuilder,
  ){
    this.isEdit = data.isEdit
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      phone: ['',Validators.required],
    })
  }
  ngOnInit(): void {
    if(this.isEdit && this.data.user){
      this.userForm.patchValue(this.data.user)
    }
  }
  onSubmit(): void {
    if(this.userForm.valid){
      this.dialogRef.close(this.userForm.value);
    }
  }
  save(){
    if(this.userForm.valid){
      const user: User = {
        ...this.data.user,
        ...this.userForm.value
      }
      this.dialogRef.close()
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
