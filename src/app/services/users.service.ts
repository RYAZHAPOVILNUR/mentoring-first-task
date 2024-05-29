import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../types/user.model";
import {UsersApiService} from "./usersApi.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  readonly USERS_STORAGE_KEY: string = 'users';
  private _users$ = new BehaviorSubject<User[]>([]); // create reactive state
  public readonly users$ = this._users$.asObservable(); // enable outer classes to read the state

  constructor(private usersApiService: UsersApiService) {
  }

  get users(): User[] {
    return this._users$.getValue()
  }

  set users(users: User[]) {
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
    this._users$.next(users);
  }

  loadUsers() {
    this.usersApiService
      .getUsers()
      .subscribe(
        (data: User[]) => {
          console.log(data);
          this.users = data;
        }
      )
  }

  deleteUser(id: number) {
    this.users = this._users$.value.filter(user => user.id !== id);
  }

  addUser(user: User) {
    const id = this.getNextId();
    const username = `${user.name}${id}`;
    this.users = ([{...user, id, username}, ...this._users$.value]);
  }

  editUser(editedUser: User) {
    this.users = (
      this._users$.getValue()
        .map(user => (user.id === editedUser.id) ? editedUser : user)
    );
  }

  getNextId() {
    return 1 + this._users$.getValue()
      .reduce((maxId, user) => Math.max(maxId, user.id), -1);
  }
}
