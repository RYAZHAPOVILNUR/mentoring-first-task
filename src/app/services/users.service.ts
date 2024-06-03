import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../types/user.model";
import {UsersApiService} from "./users-api.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  public readonly USERS_STORAGE_KEY: string = 'users';
  private readonly _users$ = new BehaviorSubject<User[]>([]); // create reactive state
  public readonly users$ = this._users$.asObservable(); // enable outer classes to read the state
  private readonly usersApiService = inject(UsersApiService);

  private get users(): User[] {
    return this._users$.value;
  }

  private set users(users: User[]) {
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
    this._users$.next(users);
  }

  private getNextId(): number {
    return 1 + this._users$.value
      .reduce((maxId, user) => Math.max(maxId, user.id), -1);
  }

  private editUser(editedUser: User): void {
    this.users = (
      this._users$.value
        .map(user => (user.id === editedUser.id) ? editedUser : user)
    );
  }

  private addUser(user: User): void {
    const id = this.getNextId();
    const username = `${user.name}${id}`;
    this.users = ([{...user, id, username}, ...this._users$.value]);
  }

  private deleteUser(id: number): void {
    this.users = this._users$.value.filter(user => user.id !== id);
  }

  private loadUsers(): void {
    this.usersApiService.get().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );
  }
}
