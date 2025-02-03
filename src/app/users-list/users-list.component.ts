import { Component, inject } from "@angular/core";
import { UserCardComponent } from "./user-card/user-card.component";
import { NgFor, AsyncPipe } from "@angular/common";
import { User } from "../models/user.interface";
import { UsersApiService } from "../services/users-api.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "./create-edit-user/create-edit-user.component";
import { Observable, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectError, selectUsers } from "./store/users.selectors";
import { UserActions } from "./store/users.actions";

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [UserCardComponent, NgFor, AsyncPipe]
})
export class UsersListsComponent {
  private readonly usersApiService = inject(UsersApiService);
  private readonly dialog = inject(MatDialog);
  private store = inject(Store);

  public readonly users$: Observable<User[]> = this.store.select(selectUsers)
  .pipe(
    tap((users) => {
      if (!users.length) {
        this.store.dispatch({type: '[Users Page] Load Users'});
      }
    })
  );

  public readonly error$ = this.store.select(selectError);

  public onEditUser(editedUser: User) {
    this.store.dispatch(UserActions.edit({user: editedUser}));
  }

  public onDeleteUser(id: number) {
    this.store.dispatch(UserActions.delete({id: id}));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, { data: null });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(UserActions.create({user: result}));
      }
    });
  }
}
