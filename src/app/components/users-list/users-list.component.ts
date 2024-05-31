import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersService} from "../../services/users.service";
import {CommonModule} from "@angular/common";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {User} from "../../types/user.model";
import {Store} from "@ngrx/store";
import {initUsers} from "../../+state/users.actions";
import {selectUsers} from "../../+state/users.selectors";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CommonModule,
    CreateEditUserComponent,
    MatDialogModule,
    MatButton,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  public readonly users$ = this.store.select(selectUsers);

  constructor(
    private readonly usersService: UsersService,
    private dialog: MatDialog,
    private store: Store
  ) {
  }

  ngOnInit() {
    const localUsers = localStorage.getItem(this.usersService.USERS_STORAGE_KEY);

    this.store.dispatch(initUsers());
    console.log('store', this.store)

    if (localUsers && localUsers.length) {
      console.log(JSON.parse(localUsers))
      this.usersService.users = JSON.parse(localUsers);
    } else {
      console.log('loading users');
      this.usersService.loadUsers();
      localStorage.setItem('users', JSON.stringify(this.usersService.users));
    }
  }

  clearLocalStorage() {
    localStorage.clear()
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  onEditUser(user: User) {
    this.openDialog(user)
  }

  openDialog(user?: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;

    const dialogRef = this.dialog.open(CreateEditUserComponent, dialogConfig);
    dialogRef.componentInstance.isEdit = !!user;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (!result) return;
      if (dialogRef.componentInstance.isEdit) {
        this.usersService.editUser({...user, ...result});
      } else {
        this.usersService.addUser(result);
      }
    });
  }
}
