import {Component, OnInit} from '@angular/core';
import {UsersApiService} from "../../../services/users/users-api.service";
import {UsersService} from "../../../services/users/users.service";
import {UserCardComponent} from "../user-card/user-card.component";
import {User} from "../../../interfaces/users";
import {of} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{
  public readonly users$ = this.usersService.users$;

  constructor(
    private usersService: UsersService,
  ){}

  ngOnInit() {
    this.usersService.loadUsers();
  }

  onDeleteUserId(id: number): void {
    this.usersService.deleteUser(id);
  }
}
