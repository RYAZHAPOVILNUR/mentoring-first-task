import { Injectable } from '@angular/core';
import { User } from '../intefaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public readonly localStorageKey = 'users';

  public loadUsersLocalStorage(): User[] {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  public saveUsersToLocalStorage(users: User[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
}
