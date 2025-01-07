import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/User.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();

  public setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }

  public editUser(editedUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user) => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      })
    );
  }

  public createUser(createUser: User) {
    const existingUser = this.usersSubject$.value.find(
      (user) => user.id !== createUser.id
    );
    if (existingUser !== undefined) {
      this.usersSubject$.next([...this.usersSubject$.value, createUser]);
    } else {
      alert('This E-Mail is already registered');
    }
  }

  public deleteuser(deletedUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user) => user.id !== deletedUser.id)
    );
  }
}
