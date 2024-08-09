import {inject, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UsersApiService} from "./users-api-service";
import {User} from "../types/user.types";
import {Store} from "@ngrx/store";
import {loadUsers} from "../states/users.actions";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  private apiService = inject(UsersApiService);
  private store = inject(Store);
  public readonly users$ = this.usersSubject$.asObservable();


  get getUsers() {
    return this.usersSubject$.getValue();
  }

  set setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }

  generateId() {
    return new Date().getTime();
  }

  updateUser(user: User) {
    const updatedUser = this.usersSubject$.getValue().map(existingUser => {
      if (existingUser.id === user.id) {
        return user;
      } else {
        return existingUser;
      }
    });
    this.usersSubject$.next(updatedUser);
  }

  addUser(user: User) {
    return this.usersSubject$.next([...this.usersSubject$.value, user])
  }

  deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id !== id));
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe((data: User[]) => {
      this.usersSubject$.next(data);
    });
  }
}
