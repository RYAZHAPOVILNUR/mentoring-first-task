import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../types/user.model";
import {UsersApiService} from "./usersApi.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]); // create reactive state
  public readonly users$ = this.usersSubject$.asObservable(); // enable outer classes to read the state

  constructor(private usersApiService: UsersApiService) {
  }

  loadUsers(): void {
    this.usersApiService
      .getUsers()
      .subscribe(
        (data: User[]) => {
          this.usersSubject$.next(data)
        }
      )
  }

  deleteUser(id: number) {
    this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id !== id));
  }

  addUser(user: User) {
    const id = this.usersSubject$.value.length;
    const username = `${user.name}${id}`;
    this.usersSubject$.next([{...user, id, username}, ...this.usersSubject$.value]);
  }

  updateUser(user: User) {
  }
}
