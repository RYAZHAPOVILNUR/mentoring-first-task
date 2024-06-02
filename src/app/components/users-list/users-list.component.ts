import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersService} from "../../services/users.service";
import {CommonModule} from "@angular/common";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {User} from "../../types/user.model";
import {Store} from "@ngrx/store";
import {addUser, deleteUser, editUser, initUsers} from "../../+state/users.actions";
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
    this.users$.subscribe(users => {
      if (!users.length) {
        this.store.dispatch(initUsers());
      }
    })
  }

  public onDeleteUser(id: number) {
    this.store.dispatch(deleteUser({id}));
  }

  public clearLocalStorage() {
    localStorage.clear()
  }

  public openDialog(user?: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;

    const dialogRef = this.dialog.open(CreateEditUserComponent, dialogConfig);
    dialogRef.componentInstance.isEdit = !!user;

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (dialogRef.componentInstance.isEdit) {
        this.store.dispatch(editUser({userData: {...user, ...result}}));
      } else {
        this.store.dispatch(addUser({userData: result}));
      }
    });
  }

  public onEditUser(user: User) {
    this.openDialog(user)
  }
}
