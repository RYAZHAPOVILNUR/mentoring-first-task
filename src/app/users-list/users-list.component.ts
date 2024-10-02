import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { MatDialog } from '@angular/material/dialog';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { loadUsers, addUser, updateUser, deleteUser } from '../states/users/users.actions';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { selectUsers } from '../states/users/users.selectors';

@Component({
  selector: 'users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  imports: [AsyncPipe, UserCardComponent, NgFor],
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public readonly users$: Observable<IUser[]> = this.store.select(selectUsers);
  readonly dialog = inject(MatDialog);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  openDialog(user: IUser | null = null): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user ? { user, isEdit: true } : { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.isEdit) {
        console.log('User edit completed');
      } else if (result) {
        console.log('User creation completed');
      }
    });
  }


  deleteUser(id: number): void {
    this.store.dispatch(deleteUser({ id }));
  }
}
