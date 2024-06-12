import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectLoadUsers } from "./users.selectors";
import * as UsersActions from "@store/users.actions";
import { User } from "@app/models/user.interface";
import { Observable } from "rxjs";
import { LocalStorageService } from "@app/services/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class UsersFacade {
    private readonly store = inject(Store);
    public users$: Observable<User[]> = this.store.select(selectLoadUsers);
    private localStorageService = inject(LocalStorageService);

    public loadUsers(): void {
        this.store.dispatch(UsersActions.loadUsers());
    }

    public addUser(addedUser: User): void {
        this.store.dispatch(UsersActions.addUser({ addedUser }));
    }

    public updateUser(updatedUser: User): void {
        this.store.dispatch(UsersActions.updateUser({ updatedUser }));
    }

    public deleteUser(user: User ): void {
        this.store.dispatch(UsersActions.deleteUser({ user }));
    }

    public setUsers(): void {
        this.users$.subscribe((users: User[]) => this.localStorageService.setItem(users));
    }
}