import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCard } from '../user-card-component/user-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { UsersApiService } from '../../services/usersApi.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserDialogComponent } from '../edit-user-dialog/create-edit-user-component';
import { Store } from '@ngrx/store';
import { UsersActions } from './Store/user.actions';
import { selectUsers } from './Store/users.selector';

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  addres?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}
export interface CreateUser {
  id: number;
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserCard, NgFor, AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  public readonly usersApiService = inject(UsersApiService);
  private readonly store = inject(Store);
  readonly users$ = this.store.select(selectUsers);
    


  ngOnInit(): void {
    console.log('Диспатчу экшен для загрузки пользователей');
    this.store.dispatch(UsersActions.loadUsers( )); // Запускаем загрузку
    
  }

  onDeleteUsers(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  editUser(user: CreateUser) {
    this.store.dispatch(UsersActions.edit({ user }));
  }

  createUser(formData: CreateUser) {
    this.store.dispatch(
      UsersActions.create({
        user: {
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          website: formData.website,
          company: {
            name: formData.company.name,
          },
        },
      })
    );
  }

  readonly dialog = inject(MatDialog);
  openDialog(user?: User): void {
    let isEdit: boolean = false;
    if (user) {
      isEdit = true;
    }
    const dialogRef = this.dialog.open(CreateEditUserDialogComponent, {
      data: { user: user, isEdit },
    });

    dialogRef.afterClosed().subscribe((result: CreateUser | User) => {
      if (result) {
        isEdit ? this.editUser(result) : this.createUser(result);
      }
    });
  }
}
