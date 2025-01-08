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
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUsers } from '../../store/users.selectors';
import { UsersActions } from '../../store/users.actions';

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
  private readonly store = inject(Store);
  public readonly users$: Observable<IUser[]> = this.store.select(selectUsers);

  constructor() {
    this.store.dispatch(UsersActions.load());
  }

  public createUser(user: IUserCreate): void {
    this.store.dispatch(UsersActions.create({
      user: {
        id: new Date().getTime(),
        name: user.name,
        email: user.email,
        website: user.website,
        phone: user.phone,
        company: {
          name: user.company.name,
        },
      }
    }));
  }

  public editUser(user: IUser): void {
    this.store.dispatch(UsersActions.edit({ user }));
  }

  public deleteUser(id: number): void {
    this.store.dispatch(UsersActions.delete({ id }));
  }
}
