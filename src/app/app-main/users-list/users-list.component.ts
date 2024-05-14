import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../../shared/models/user.models';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../../shared/components/create-edit-user/create-edit-user.component';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { MatButton } from "@angular/material/button";
import { Store } from '@ngrx/store';
import * as UsersActions from '../../libs/users/data-access/src/lib/state/users.actions';
import * as UsersSelectors from '../../libs/users/data-access/src/lib/state/users.selectors';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, NgFor, MatButton],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  private dialog = inject(MatDialog);
  private dialogRef!: MatDialogRef<CreateEditUserComponent>;

  private readonly store = inject(Store);
  private readonly localStorageService = inject(LocalStorageService);

  public readonly users$ = this.store.select(UsersSelectors.selectAllUsers);

  ngOnInit(): void {
    const usersOfStorage = this.localStorageService.getItem('users');

    if (usersOfStorage) {
      const users: IUser[] = JSON.parse(usersOfStorage);
      if (users.length !== 0) {
        this.store.dispatch(UsersActions.setUsers({ users }))
        return;
      }
    }

    this.store.dispatch(UsersActions.loadUsers());
  }

  openDialog(user?: IUser): void {
    this.dialogRef = this.dialog.open(CreateEditUserComponent);

    this.dialogRef.afterOpened().subscribe(() => {
      if (user) {
        this.dialogRef.componentInstance.isEdit = true;
        this.dialogRef.componentInstance.formnameControl.patchValue(user);
      } else this.dialogRef.componentInstance.isEdit = false;
    });

    this.dialogRef.afterClosed().subscribe(() => {
      if (this.dialogRef.componentInstance.isEdit && user && this.dialogRef.componentInstance.formnameControl.valid) {
        this.editUser(user);
      } else if (this.dialogRef.componentInstance.formnameControl.valid) {
        this.addUser(this.dialogRef.componentInstance.formnameControl.value);
      }
    });
  }

  addUser(user: IUser): void {
    this.store.dispatch(UsersActions.addUser({ user }));
    this.store.select('users').subscribe(state => this.localStorageService.setItem('users', JSON.stringify(state.users))).unsubscribe();
  }

  deleteUser(id: number): void {
    this.store.dispatch(UsersActions.deleteUser({ id }));
    this.store.select('users').subscribe(state => this.localStorageService.setItem('users', JSON.stringify(state.users))).unsubscribe();
  }

  editUser(userEdit: IUser): void {
    const user = {...userEdit, ...this.dialogRef.componentInstance.formnameControl.value};
    this.store.dispatch(UsersActions.editUser({ user }));
    this.store.select('users').subscribe(state => this.localStorageService.setItem('users', JSON.stringify(state.users))).unsubscribe();
  }

}
