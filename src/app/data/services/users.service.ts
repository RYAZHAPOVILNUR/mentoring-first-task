import { Injectable, inject } from '@angular/core';
import { User } from '../intefaces/user.interface';
import { UsersApiService } from './users-api-service.service';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userApiSevice = inject(UsersApiService);
  private readonly localStorageService = inject(LocalStorageService);
  private usersSubject$ = new BehaviorSubject<User[]>(
    this.localStorageService.getUsersLocalStorage()
  );
  public readonly users$ = this.usersSubject$.asObservable();

  public loadUserData() {
    const localUsers = this.localStorageService.getUsersLocalStorage();
    if (localUsers.length > 0) {
      this.usersSubject$.next(localUsers);
    } else {
      this.userApiSevice.getUsers().subscribe((data: User[]) => {
        this.usersSubject$.next(data);
        this.localStorageService.saveUsersToLocalStorage(data);
      });
    }
  }

  public deleteUser(id: number) {
    const currentUsers = this.usersSubject$.getValue();
    const filteredUsers = currentUsers.filter((user) => user.id !== id);
    this.usersSubject$.next(filteredUsers);
    this.localStorageService.saveUsersToLocalStorage(filteredUsers);
  }

  public createUser(user: User) {
    const currentUsers = this.usersSubject$.getValue();
    const updatedUsers = [...currentUsers, user];
    this.usersSubject$.next([...currentUsers, user]);
    this.localStorageService.saveUsersToLocalStorage(updatedUsers);
  }

  public updateUser(user: User) {
    const updatedUsers = this.usersSubject$.getValue().map((existingUser) => {
      return existingUser.id === user.id ? user : existingUser;
    });
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.saveUsersToLocalStorage(updatedUsers);
  }
}
