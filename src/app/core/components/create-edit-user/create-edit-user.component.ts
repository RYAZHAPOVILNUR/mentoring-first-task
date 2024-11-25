import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog'; // для модальных окон
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogClose,
    MatDialogModule
  ]
})
export class CreateEditUserComponent {
  userForm: FormGroup;
  public data = inject(MAT_DIALOG_DATA);
  isEdit : boolean;
  public userService = inject(UsersService)
  readonly dialogRef = inject(MatDialogRef)

  constructor(private fb: FormBuilder) {
    this.isEdit = this.data.isEdit
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      website: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w.-]+)+[\w-]+(\/[\w-]*)?$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

     if(this.isEdit){
       this.userForm.patchValue(this.data.user)
     }  else {
       this.userForm.patchValue({name: '', phone: '', website: '', email: ''})
     }
   
  }

  get userWithUpdateFields(){
    return {
      //id: this.data.user.id,
      name: this.userForm.value.name,
      phone: this.userForm.value.phone,
      website: this.userForm.value.website,
      email: this.userForm.value.email,
     }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value)
    } else {
      console.log('Форма содержит ошибки.');
    }
    
  }

  closeModal(): void {
    this.dialogRef.close()
  }

}