import {Component, Inject, inject, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {User} from "../user.interface";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersListComponent} from "../users-list/users-list.component";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    AsyncPipe,
    UserCardComponent,
    NgIf,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})

export class UserEditComponent {
  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    console.log(data);  // Добавьте логирование для отладки
    this.initForm(data)
  }

  private readonly userService = inject(UsersService);
  public userForm!:FormGroup;
  private initForm(data: User) {
    this.userForm = new FormGroup({
      name: new FormControl(data.name || ''),
      email: new FormControl(data.email || ''),
      id: new FormControl(data.id || ''),
      phone: new FormControl(data.phone || '')
    });
  }

    editUser(data: User) {
      const userData:User = {...data, ...this.userForm.value}
      let oldUser=this.usersService.usersSubject$.value.find(user => user.id === userData.id);
      console.log('oldUser')
      console.log(oldUser)
      console.log('userData')
      console.log(userData)
      if(userData.id==oldUser?.id){
        oldUser!.name = userData.name;
        oldUser!.email = userData.email;
        oldUser!.phone = userData.phone;
        this.userService.saveData()
      } else {
        alert('YOU CAN NOT CHANGE ID');
      }
    }
}
