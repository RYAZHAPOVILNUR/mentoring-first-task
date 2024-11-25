import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IUser } from './users-list/users.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject.asObservable();

  public setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  public editUser(editedUser: IUser): void {
    this.usersSubject.next(
      this.usersSubject.value.map((user) => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      })
    );
  }

  public createUser(user: IUser): void {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }

  public deleteUser(id: number): void {
    this.usersSubject.next(
      this.usersSubject.value.filter((user) => id !== user.id)
    );
  }
}
