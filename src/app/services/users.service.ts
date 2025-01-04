import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/User.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();

  setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }

  deleteuser(deletedUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user) => user.id !== deletedUser.id)
    );
    console.log('DeletedUser userService', deletedUser);
  }
}
