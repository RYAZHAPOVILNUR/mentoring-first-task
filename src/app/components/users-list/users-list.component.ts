import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  selectAllUsers,
  selectUsersLoading,
  selectUsersError,
} from '../../store/users/users.selectors';
import * as UserActions from '../../store/users/users.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public filteredUsers: User[] = [];
  public loading$: Observable<boolean>;
  public error$: Observable<string | null>;

  public searchQuery: string = '';

  private readonly users$: Observable<User[]>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.users$ = this.store.pipe(select(selectAllUsers));
    this.loading$ = this.store.pipe(select(selectUsersLoading));
    this.error$ = this.store.pipe(select(selectUsersError));
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.users$.subscribe((users) => {
      this.filteredUsers = users;
    });
  }

  onUserDelete(userId: number): void {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  openCreateEditUserDialog(user?: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '600px',
      data: {
        user: user || {},
        isEdit: !user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (user) {
          this.store.dispatch(
            UserActions.editUser({ editUser: { ...user, ...result } })
          );
        } else {
          this.store.dispatch(UserActions.addUser({ newUser: result }));
        }
      }
    });
  }

  onSearch($event: Event): void {
    $event.preventDefault();
    this.users$
      .pipe(
        map((users) =>
          users.filter((user) =>
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        )
      )
      .subscribe((filteredUsers) => {
        this.filteredUsers = filteredUsers;
      });
  }
}
