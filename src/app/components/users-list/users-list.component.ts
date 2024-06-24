import { AsyncPipe, NgFor } from "@angular/common";
import { Component, Input, OnInit, inject } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { UserCard } from "../user-card/user-card.component";
import { CreatEditUser } from "../create-edit-user/create-edit-user.component";
import { IUser } from "../../user";
import { IAppState } from "../../store/state";
import { isLoadingSelector, errorSelector, usersSelector } from "../../store/selectors";
import * as UsersActions from "../../store/actions";

@Component({
  selector: "users-list",
  imports: [NgFor, UserCard, AsyncPipe, MatListModule, MatDialogModule, MatButtonModule],
  standalone: true,
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit {
  @Input()
  public isEdit = true;
  private readonly store:Store<IAppState> = inject(Store);
  readonly isLoading$: Observable<boolean> = this.store.select(isLoadingSelector);
  readonly users$: Observable<IUser[]> = this.store.select(usersSelector);
  readonly error$: Observable<any> = this.store.select(errorSelector);

  constructor(
    public dialog: MatDialog,
  ) {}

  onDeleteUser(id: number) {
    this.store.dispatch(UsersActions.removeUser({ id }));
  }

  openEditDialog(user: IUser) {
    const dialogRef = this.dialog.open(CreatEditUser, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.store.dispatch(UsersActions.editUser({user: res.data}));
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CreatEditUser, {});

    dialogRef.afterClosed().subscribe(res => {
      const id = crypto.randomUUID();
      const data = { ...res.data, id: id };
      this.store.dispatch(UsersActions.addUser({user: data}));
    });
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers());
  }
}
