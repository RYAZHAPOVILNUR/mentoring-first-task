import { AsyncPipe, NgFor } from "@angular/common";
import { Component, Input, OnInit, inject } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

import { UserCard } from "../user-card/user-card.component";
import { usersService } from "../../UsersService";
import { CreatEditUser } from "../create-edit-user/create-edit-user.component";
import { IUser } from "../../user";
import { Store } from "@ngrx/store";
import { IAppState } from "../../store/state";
import { Observable } from "rxjs";
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
  // public readonly users$ = this.usersService.users$;
  public isEdit = true;

  constructor(
    private usersService: usersService,
    public dialog: MatDialog,
    // private readonly store:Store<IAppState> = inject(Store),
    // readonly isLoading$: Observable<any> = store.select(isLoadingSelector),
    // //posts
    // readonly posts$: Observable<any> = store.select(usersSelector),
    // //error
    // readonly error$: Observable<any> = store.select(errorSelector)
  ) {}

  onCreateUser(user: IUser) {
    this.usersService.createUser(user);
  }

  onEditUser(user: IUser) {
    this.usersService.editUser(user);
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  openEditDialog(user: IUser) {
    const dialogRef = this.dialog.open(CreatEditUser, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.onEditUser(res.data);
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CreatEditUser, {});

    dialogRef.afterClosed().subscribe(res => {
      const id = crypto.randomUUID();
      const data = { ...res.data, id: id };
      this.onCreateUser(data);
    });
  }

  private readonly store:Store<IAppState> = inject(Store);
  //return the isloading slice of the state
  readonly isLoading$: Observable<boolean> = this.store.select(isLoadingSelector);
  //posts
  readonly users$: Observable<IUser[]> = this.store.select(usersSelector);
  //error
  readonly error$: Observable<any> = this.store.select(errorSelector);

  //fetch store data
  public fetchStoreData(){
    //this also triggers the effects
    this.store.dispatch(UsersActions.getUsers());
  }


  ngOnInit(): void {
    this.fetchStoreData();
  }
}
