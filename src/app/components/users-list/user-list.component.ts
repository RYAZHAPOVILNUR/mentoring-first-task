import { Component, inject } from '@angular/core';
import { UsersApiComponent } from '../../services/users-api.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { User } from '../../Interfaces/user.interface';
import { UserCardComponents } from './user-cards/user-card.component';
import { UserFormComponent } from '../forms/user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { UserActions } from './store/user-store/user.actions';
import { selectUsers } from './store/users.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: true,
  imports: [NgFor, UserCardComponents, AsyncPipe, UserFormComponent],
})
export class UserListComponent {
  apiService = inject(UsersApiComponent);
  store = inject(Store);
  users$ = this.store.select(selectUsers);

  constructor() {
    this.apiService.getUsers().subscribe((response: User[]) => {
      this.store.dispatch(UserActions.set({ users: response }));
    });
  }

  deleteUser(id: number) {
    let isConfirm = confirm('Вы действительно хотите удалить пользователя?');
    if (isConfirm === true) {
      this.store.dispatch(UserActions.delete({ id }));
    }
  }
  editUser(editedUsers: User) {
    this.store.dispatch(UserActions.edit({ user: editedUsers }));
  }

  createUser(event: User) {
    this.store.dispatch(
      UserActions.create({
        user: {
          id: new Date().getTime(),
          name: event.name,
          email: event.email,
          address: {
            city: event.address?.city,
          },
          phone: event.phone,
        },
      })
    );
  }
  
}
