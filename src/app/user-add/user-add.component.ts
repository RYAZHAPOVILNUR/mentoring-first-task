import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogActions, MatDialogClose, MatDialogContainer, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {addedUser, User} from "../user.interface";
import {UsersService} from "../users.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogContainer,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatSuffix,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    FormsModule,
    NgForOf
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})

export class UserAddComponent {
  private readonly userService = inject(UsersService)
  user: User = {
    id:0,
    name:'',
    username: "",
    email:'',
    phone:'',
    website: "",
  };

  onAddUser(user: User) {
    this.userService.addUser(user)
    console.log(user);
    this.userService.saveData()
  }
}
