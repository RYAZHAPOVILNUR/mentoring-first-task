import { Component, OnInit } from '@angular/core';
import { User } from '../users.interface';
import { UsersApiService } from '../users.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(private usersApiService: UsersApiService) {}

  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
