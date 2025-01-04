import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { UsersApiService } from "../../services/users-api.service";
import { UsersService } from "../../services/users.service";
import {
  AsyncPipe,
  NgFor
} from "@angular/common";
import {
  IUser,
  IUserCreate
} from "../../Interfaces/IUser";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "./create-user-form/create-user-form.component";
import { CreateUserBtnComponent } from "./create-user-btn/create-user-btn.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent, CreateUserFormComponent, CreateUserBtnComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  public readonly usersApiService: UsersApiService = inject(UsersApiService);
  public readonly usersService: UsersService = inject(UsersService);

  constructor() {
    this.usersService.loadUsers();
  }

  public createUser(user: IUserCreate): void {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: user.name,
      email: user.email,
      website: user.website,
      phone: user.phone,
      company: {
        name: user.company.name,
      },
    });
  }

  public editUser(user: IUser): void {
    this.usersService.editUser({
      ...user,
      company: {
        name: user.company.name,
      },
    });
  }

  public deleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }
}
