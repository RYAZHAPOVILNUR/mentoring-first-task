import { Injectable } from '@angular/core';
import { User } from './users-list/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();

  setUsers(users: User[]) {
    this.usersSubject$.next(users)
  }

  editUser(editUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user:User) => {
        if (user.id === editUser.id) {
          return editUser
        } else {
          return user
        }
      })
    )
  }

  createUser(user: User) {
    this.usersSubject$.next([...this.usersSubject$.value, user]);
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item) => item.id !== id)
    );
  }
}
