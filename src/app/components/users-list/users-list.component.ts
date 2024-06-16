// src/app/components/users-list/users-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import * as fromUsers from '../../store/users/users.selectors';
import * as UsersActions from '../../store/users/users.action';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.users$ = this.store.select(fromUsers.selectAllUsers);
  }

  ngOnInit(): void {
    const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (localUsers.length) {
      this.store.dispatch(UsersActions.loadUsersSuccess({ users: localUsers }));
    } else {
      this.store.dispatch(UsersActions.loadUsers());
    }
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UsersActions.addUser({ user: result }));
        this.updateLocalStorage();
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UsersActions.editUser({ user: result }));
        this.updateLocalStorage();
      }
    });
  }
  deleteUser(id: number): void {
    this.store.dispatch(UsersActions.deleteUser({ id }));
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    this.users$.subscribe((users) => {
      localStorage.setItem('users', JSON.stringify(users));
    });
  }
}
