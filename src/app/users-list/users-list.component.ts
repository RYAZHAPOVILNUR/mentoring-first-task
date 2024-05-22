import {Component, EventEmitter, inject, NgModule, OnInit, Output} from '@angular/core';
import {AsyncPipe, NgFor} from '@angular/common';
import {addedUser, User} from '../user.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from '../user-card/user-card.component';
import {UsersApiService} from "../users-api.service";
import {Observable} from "rxjs";
import {UsersService} from "../users.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, MatDialogModule, MatButton],
  providers: [HttpClientModule, HttpClient],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})

export class UsersListComponent {
  private readonly userService = inject(UsersService);
  users$: Observable<User[]> = this.userService.users$;
  constructor(private UsersApiService: UsersApiService) {
    this.userService.loadUsers()
  }

  deleteUser(id:number) {
    this.userService.deleteUser(id)
    this.userService.saveData()
  }
}

