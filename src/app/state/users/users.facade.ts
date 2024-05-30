import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as UsersActions from "./users.action";
import { IUser } from "@models/user.model";
import { selectUsers } from "./users.selector";


@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly store = inject(Store);

  public readonly usersState$ = this.store.select(selectUsers);

  public loadUsers() {
    this.store.dispatch(UsersActions.loadUsers());
  }

  public createUser(userData: IUser) {
    this.store.dispatch(UsersActions.createUser({userData}));
  }

  public deleteUser(userToDelete: IUser) {
    this.store.dispatch(UsersActions.deleteUser({userToDelete}));
  }

  public editUser(userToEdit: IUser) {
    this.store.dispatch(UsersActions.editUser({userToEdit}));
  }
}
