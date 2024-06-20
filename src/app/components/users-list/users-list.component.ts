import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../shared/interfaces/user.interface';
import { CreateEditUserComponent } from '../../dialog/create-edit-user/create-edit-user.component';
import { Store } from "@ngrx/store";
import * as UsersActions from "../../+state/users.actions";
import { selectInitUsers, selectLoadUsersError, selectLoadUsersSuccess } from "../../+state/users.selectors";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  public readonly loading$ = this.store.select(selectInitUsers);
  public readonly users$ = this.store.select(selectLoadUsersSuccess);
  public readonly error$ = this.store.select(selectLoadUsersError);

  ngOnInit(): void {
    this.store.dispatch(UsersActions.initUsers());
  }

  public deleteUser(id: number): void {
    this.store.dispatch(UsersActions.deleteUser({id}));
  }

  public openAddUserDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '30%',
      data: { user: null, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.store.dispatch(UsersActions.addUser({userData: newUser}));
      }
    })
  }

  public openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open<CreateEditUserComponent, { user: User, isEdit: boolean }, any>
    (CreateEditUserComponent, {
      width: '30%',
      data: {user, isEdit: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(UsersActions.editUser({userEdit: { ...user, ...result }}));
      }
    })
  }
}
