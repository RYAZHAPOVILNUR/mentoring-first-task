import { Component, Inject, OnInit, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { AsyncPipe } from '@angular/common';
import { DialogCreateEditUser } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserCardComponent } from '../user-card/user-card.component';
import { Store } from '@ngrx/store';
import { getUsers, deleteUser, addUser, editUser } from '../../reducers/users.actions';
import { selectUsers } from '../../reducers/users.selector';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  public readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  public users$ = this.store.select(selectUsers);

  ngOnInit() {
    this.store.dispatch(getUsers());
  }

  deleteUser(userId: number): void {
    this.store.dispatch(deleteUser({ id: userId }));
  }

  openDialog(user?: User): void {
    let isEdit: boolean = false;
    if (user) {
      isEdit = true;
    }

    const dialogRef = this.dialog.open<DialogCreateEditUser, { user: User | undefined, isEdit: boolean }, User>(DialogCreateEditUser, {
      data: {
        user: user,
        isEdit: isEdit,
      }
    });

    dialogRef.afterClosed().subscribe(
      (userData) => {
        if (userData) {
          isEdit ?
            this.store.dispatch(editUser({ userData })) :
            this.store.dispatch(addUser({ userData }));
        }
      }
    );
  }

}
