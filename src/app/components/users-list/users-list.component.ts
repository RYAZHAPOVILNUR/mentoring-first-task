import { Component, OnInit, inject } from '@angular/core';
import { UsersCardComponent } from '../users-card/users-card.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { UserEntity } from '../../entities/UserEntity';
import { Store } from '@ngrx/store';
import { UsersState } from '../../ngrx/users.reducer';
import { addUser, deleteUser, editUser, loadUsers } from '../../ngrx/users.actions';
import * as UserSelectors from '../../ngrx/users.selector';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    UsersCardComponent,
    MatButton,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  private readonly store: Store<UsersState> = inject(Store);
  public users$ = this.store.select(UserSelectors.selectUsers);

  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  public openCreateEditUserDialog(user?: UserEntity) {
    const isEdit = Boolean(user);
    const dialogRef = this.dialog.open(CreateEditUserComponent, {data: {user, isEdit}});

    dialogRef.afterClosed().subscribe((editedUser?: UserEntity) => {
      if (!editedUser) return;
      isEdit
        ? this.store.dispatch(editUser({userData: editedUser}))
        : this.store.dispatch(addUser({userData: editedUser}))
    })
  }

  public onUserDelete(id: number) {
    this.store.dispatch(deleteUser({id}))
  }
}
