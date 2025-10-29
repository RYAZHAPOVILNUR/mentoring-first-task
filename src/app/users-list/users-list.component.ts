import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../users.service';
import { User } from './users.interface';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { CreateUser } from '../create-user-form/create-user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);
    });
  }

  createUser(formDateUser: CreateUser) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formDateUser.name,
      username: formDateUser.username,
      email: formDateUser.email,
      company: {
        name: formDateUser.companyName,
      },
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }
}
