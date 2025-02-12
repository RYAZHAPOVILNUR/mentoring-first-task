import { Injectable } from '@angular/core';
import { User } from '../types/user.interface';
import { BehaviorSubject, skip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor() {
    this.users$
    .pipe(skip(1))
    .subscribe((data) => {
      localStorage.setItem("users", JSON.stringify(data))
      this.users = data;
    });
  }

  public addUser(user: User): void {
    this.users$.next(
      this.users$.value.concat({
        ...user,
        id: this.users$.value.sort((a,b) => a.id-b.id).slice(-1)[0].id + 1,
      })
    );
  }

  public editUser(editedUser: User): void {
    this.users$.next(
      this.users$.value.map((user) =>
        editedUser.id === user.id ? editedUser : user
      )
    );
  }

  public deleteUser(id: number): void {
    this.users$.next(this.users$.value.filter((user) => user.id !== id));
  }

  public setUsers(data: User[]): void {
    this.users$.next(data);
  }
}
