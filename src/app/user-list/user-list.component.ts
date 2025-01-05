import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditCard } from '../create-edit-component/create-edit-card.component';
import { User } from '../user.model';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../NGRX/actions';
import * as selectUser from '../NGRX/selector';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [NgFor, AsyncPipe, CreateEditCard],
})
export class UserList implements OnInit {
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUser.usersSelector);
  public readonly loadingUsers$ = this.store.pipe(select(selectUser.loadingSelector));

  constructor(
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.users$.subscribe((users) => {
    });

    this.store.dispatch(UserActions.loadUsers()); 
  }

  deleteUser(userId: number): void {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }
  editUser(user: User): void {
    this.openModal(user);
  }

  openModal(user?: User) {
    const isEdit = Boolean(user);
    const dialogRef = this.dialog.open(CreateEditCard, {
      hasBackdrop: true,
      data: {
        user: user ?? { id: '', name: '', email: '', username: '' },
        isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((newUser) => {
      if (!newUser) return;

      newUser.id = +newUser.id;

      if (isEdit) {
        this.store.dispatch(UserActions.editUser({ editedUser: newUser }));
      } else {
        this.store.dispatch(UserActions.addUser({ user: newUser }));
      }
    });
  }
}
