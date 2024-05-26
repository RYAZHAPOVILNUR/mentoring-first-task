import {Component} from '@angular/core';
import {UsersApiService} from "../../services/usersApi.service";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  constructor(private readonly usersService: UsersApiService) {
    this.usersService.getUsers();
  }
}
