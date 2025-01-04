import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api-service';
import { User } from '../../interfaces/User.interface';
import { UserService } from '../../services/users.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUser } from '../../interfaces/CreateUser.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent, MatButton],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly userService = inject(UserService);
  readonly userApiService = inject(UsersApiService);
  readonly createUserDialog = inject(MatDialog);

  constructor() {
    this.userApiService.getUsers().subscribe((response: User[]) => {
      this.userService.setUsers(response);
    });
  }

  public onCreateUserDialog() {
    const dialogRef = this.createUserDialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe((createResult: CreateUser) => {
      if (createResult) {
        this.userService.createUser({
          id: new Date().getTime(),
          name: createResult.name,
          email: createResult.email,
          website: createResult.website,
          company: {
            name: createResult.companyName,
          },
        });
      }
    });
  }

  public deletedUser(deletedUser: User) {
    this.userService.deleteuser(deletedUser);
  }
}
