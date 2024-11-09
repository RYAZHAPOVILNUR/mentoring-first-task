import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {User} from "../../data/interfaces/userApiService";
import {UserApiService} from "../../data/services/userApiService";

import {AsyncPipe, JsonPipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {UserCardComponent} from "./user-card/user-card.component";
import {UserServiceService} from "./user.service.service";



@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    RouterOutlet,
    JsonPipe,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    UserCardComponent,
    AsyncPipe
  ],changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  readonly  userService = inject(UserApiService);
  readonly userServiceService = inject(UserServiceService)



  constructor() {
    this.userService.getApiUser().subscribe(receivedUsers => {
      this.userServiceService.setUser(receivedUsers);
    })

  }

  addUser(user: User) {
    this.userServiceService.createUser(user);
  }

  removeUser(userId: number) {
    this.userServiceService.deleteUser(userId);
  }
}
