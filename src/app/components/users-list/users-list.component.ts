import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../users-api.service';
import { UsersService } from '../../users.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public readonly users$ = this.usersService.users$;

  constructor(
    private usersApiService: UsersApiService,
    private usersService: UsersService
  ) {};

  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe((users) => {
      this.usersService.setUsers(users);
    });
  };

  onUserDeleted(userId: number): void {
    this.usersService.deleteUser(userId);
  };
};
