import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { UserCardComponent } from '../user-card/user-card.component';
import { User } from '../interface/users.interface';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { UserService } from '../service/user.service';




@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatInputModule,
  MatFormFieldModule, ReactiveFormsModule, UserCardComponent],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})

export class CreateEditUserComponent{
public data = inject(MAT_DIALOG_DATA)
public userService= inject(UserService)
private dialogRef = inject(MatDialogRef<CreateEditUserComponent>)



public newForm= new FormGroup({
  name: new FormControl(this.data.user.name, [Validators.required]),
  username: new FormControl(this.data.user.username, [Validators.required]),
  phone: new FormControl(this.data.user.phone, [Validators.required]),
  email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
})




public  saveUser(){
  if(this.newForm.valid){
    this.data.user = {...this.data.user, 
      name: this.newForm.value.name,
      userName: this.newForm.value.username,
      phone: this.newForm.value.phone,
      email: this.newForm.value.email
    }
   this.userService.addUser(this.data.user)
   this.dialogRef.close()
   console.log(this.newForm.value)
  }else{
    alert('Вы не заполнили поля')
  }

}



}