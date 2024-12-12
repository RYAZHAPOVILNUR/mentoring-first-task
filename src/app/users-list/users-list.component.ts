import {ChangeDetectionStrategy, Component, inject, OnInit,} from '@angular/core';
import {IUser} from "../interface/user";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {CreateEditUserComponent} from "./create-edit-user/create-edit-user.component";
import {Store} from "@ngrx/store";
import {UsersAction} from "../store/user.action";
import {selectUsers} from "../store/user.selector";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    UserCardComponent,
    MatMiniFabButton,
    MatIconModule,
    MatButton,

  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  readonly store = inject(Store)
  readonly users$ = this.store.select(selectUsers)
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.store.dispatch(UsersAction.loadUsers())
  }

  public delete(id: number) {
    this.store.dispatch(UsersAction.deleteUser({ id }))
  }

  openDialog(isEdit: boolean, user?: IUser) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { isEdit, user: user }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (isEdit && result) {
        this.store.dispatch(UsersAction.editUser({ updatedUser: result }));
        console.log(result)
      }
      else if (!isEdit && result){
        this.store.dispatch(UsersAction.createUser({ user: result}))
      }
    });
  }
}
