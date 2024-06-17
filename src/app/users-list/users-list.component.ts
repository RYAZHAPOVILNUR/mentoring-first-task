import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatButton } from '@angular/material/button';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { Store } from '@ngrx/store';
import {
  addUser,
  deleteUser,
  editUser,
  initUsers,
} from '../state/users.actions';
import { selectAllUsers } from '../state/users.selectors';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AsyncPipe, UserCardComponent, MatButton],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectAllUsers);
  private readonly dialog = inject(MatDialog);

  public openDialog(user?: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      autoFocus: true,
      data: user,
    });
    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        if (Boolean(user)) {
          this.store.dispatch(editUser({ userData: { ...user, ...result } }));
        } else this.store.dispatch(addUser({ userData: result }));
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(initUsers());
  }

  public onDeleteUser(id: number): void {
    this.store.dispatch(deleteUser({ id }));
  }
}
