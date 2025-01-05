import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';

import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserActions } from '../NGRX/actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _users$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this._users$.asObservable();
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(
    private store: Store
  ) {
    this.loadUsersFromLocalStorage();
  }

  private loadUsersFromLocalStorage(): void {
    if (this.isBrowser) {
      const usersFromLocalStorage = localStorage.getItem('users');
      if (usersFromLocalStorage) {
        const users: User[] = JSON.parse(usersFromLocalStorage);
        this.store.dispatch(UserActions.setUsers({ users }));
      }
    }
  }

  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public setUsers(users: User[]): void {
    this.store.dispatch(UserActions.setUsers({ users }));
    this.saveUsersToLocalStorage(users);
  }

  public deleteUser(userId: number): void {
    const currentUsers = this._users$.getValue();
    const updatedUsers = currentUsers.filter((user) => user.id !== userId);
    
    this._users$.next(updatedUsers);
    this.saveUsersToLocalStorage(updatedUsers);
  }

  public addUser(user: User): void {
    this.store.dispatch(UserActions.addUser({ user }));
  }

  public editUser(user: User): void {
    const currentUsers = this._users$.getValue();
    const updatedUsers: User[] = [...currentUsers];
    const index = currentUsers.findIndex(
      (currentUser) => user.id === currentUser.id
    );
    updatedUsers[index] = user;
    this._users$.next(updatedUsers);
    this.saveUsersToLocalStorage(updatedUsers);
  }
}
