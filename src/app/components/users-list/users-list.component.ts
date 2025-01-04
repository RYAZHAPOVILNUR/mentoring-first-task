import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api-service';
import { User } from '../../interfaces/User.interface';
import { UserService } from '../../services/users.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly userService = inject(UserService);
  readonly userApiService = inject(UsersApiService);

  constructor() {
    this.userApiService.getUsers().subscribe((response: User[]) => {
      this.userService.setUsers(response);
    });
  }

  public deletedUser(deletedUser: User) {
    this.userService.deleteuser(deletedUser);
  }
}
