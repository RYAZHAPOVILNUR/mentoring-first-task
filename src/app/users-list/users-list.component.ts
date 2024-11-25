import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { IUser } from './users.interface';
import { LocalStorageService } from '../local-storage.service';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/users.actions';
import { selectUser } from './store/users.selectors';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  public readonly usersApiService = inject(UsersApiService);
  public readonly dialogCreate = inject(MatDialog);
  public readonly localStorageService = inject(LocalStorageService);
  public readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUser);

  constructor() {
    let storageData = this.localStorageService.getItem();
    if (storageData) {
      let storageDataParsed = JSON.parse(storageData);
      this.store.dispatch(UsersActions.set({ users: storageDataParsed }));
    } else {
      this.usersApiService.getUsers().subscribe((response: IUser[]) => {
        this.store.dispatch(UsersActions.set({ users: response }));
        this.localStorageService.setItem(JSON.stringify(response));
      });
    }
  }

  public deleteUser(id: number): void {
    this.store.dispatch(UsersActions.delete({ id }));
    this.localStorageService.removeItem(id);
  }

  public createUser(user: IUser): void {
    this.store.dispatch(
      UsersActions.create({
        user: {
          ...user,
          id: new Date().getTime(),
        },
      })
    );
    this.localStorageService.addItem({
      ...user,
      id: new Date().getTime(),
    });
  }

  public editUser(editedUser: IUser): void {
    this.store.dispatch(UsersActions.edit({ user: editedUser }));
    this.localStorageService.editItem(editedUser);
  }

  public openCreateDialog(): void {
    const dialogRef = this.dialogCreate.open(CreateEditUserComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: IUser | undefined) => {
      if (!result) return;
      this.createUser(result);
    });
  }
}
