import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { IUser } from "./user";
import { UsersApiService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class usersService {
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject.asObservable();

  constructor(private UsersApiService: UsersApiService) {}

  loadUsers() {
    this.UsersApiService.getUsers().subscribe((data: IUser[]) => {
      this.updateUsersState(data);
    });
  }

  updateUsersState(data: IUser[]) {
    this.usersSubject.next(data);
    localStorage.setItem("users", JSON.stringify(data));
  }

  getUsers() {
    const users: IUser[] = JSON.parse(localStorage.getItem("users")!);
    if (users && users.length > 0) {
      console.log(users.length);
      this.usersSubject.next(users);
    } else this.loadUsers();
  }

  createUser(user: IUser) {
    const updatedUsers = this.usersSubject.getValue().concat([user]);
    this.updateUsersState(updatedUsers);
  }

  editUser(user: IUser) {
    const updatedUsers = this.usersSubject.value.map(item => (item.id === user.id ? user : item));
    this.updateUsersState(updatedUsers);
  }

  deleteUser(id: number) {
    const updatedUsers = this.usersSubject.value.filter(user => user.id != id);
    this.updateUsersState(updatedUsers);
  }
}
