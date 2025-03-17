import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  users$ = this.usersService.users$;

  constructor(
    private usersApiService: UsersApiService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersApiService.getUsers().subscribe(users => {
      this.usersService.setUsers(users);
    });
  }

  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }
}
