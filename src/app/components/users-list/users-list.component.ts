import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersService} from "../../services/users.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CommonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  public readonly users$ = this.usersService.users$;

  constructor(private readonly usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.loadUsers();
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
  }
}
