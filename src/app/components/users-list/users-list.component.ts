import {Component, inject, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {CommonModule} from "@angular/common";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {User} from "@app/types/user.model";
import {Store} from "@ngrx/store";
import {addUser, deleteUser, editUser, initUsers} from "@app/+state/users.actions";
import {selectUsers} from "@app/+state/users.selectors";

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
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  public openDialog(user?: User): void {
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

  ngOnInit(): void {
    this.users$.subscribe(users => {
      if (!users.length) {
        this.store.dispatch(initUsers());
      }
    })
  }

  public onDeleteUser(id: number): void {
    this.store.dispatch(deleteUser({id}));
  }
}
