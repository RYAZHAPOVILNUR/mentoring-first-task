import {Component, inject, OnInit} from '@angular/core';
import {UsersService} from "../../services/users-service";
import {UserCardComponent} from "../user-card/user-card.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatDialog, MatDialogActions} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {DialogOverviewComponent} from "../dialog-overview/dialog-overview.component";
import {User} from "../../types/user.types";
import {Store} from "@ngrx/store";
import {addUser, deleteUser, loadUsers, updateUser} from "../../states/users.actions";
import {selectUsers} from "../../states/users.selectors";
  import * as userActions from "../../states/users.actions"

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    NgForOf,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogActions
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  public store = inject(Store);
  public matDialog = inject(MatDialog);

  public readonly users$ = this.store.select(selectUsers);
  public statementIsEdit: boolean = true;

  ngOnInit() {
    this.store.dispatch(loadUsers());
    // this.userService.loadUsers();
  }

  openDialog(user?: User) {
    const userRef = this.matDialog.open(DialogOverviewComponent, {
      data: {
        isEdit: this.statementIsEdit,
        user: user,
        title: 'Добавить',
      },
    });
    userRef.afterClosed().subscribe((result: User) => {
      if (user) {
        this.store.dispatch(updateUser({updatedUser: {...user, ...result}}))
      } else {
        this.store.dispatch(addUser({user: result}));
      }
    });
  }

  onDeleteUser(id: number): void {
    this.store.dispatch(deleteUser({id: id}))
    // this.userService.deleteUser(id);
  }
}
