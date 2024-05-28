import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { UsersApiService } from './usersApi.service';
import { StorageKey } from '../../shared/enums/user.enum';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class UsersService {
  private readonly _users$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this._users$.asObservable();
  private readonly _usersApiService = inject(UsersApiService);
  private readonly _localStorageService = inject(LocalStorageService);

  constructor() {
    this.loadInitialUsers();
  }

  private get users(): User[] | null { 
    return this._users$.getValue(); 
  }

  private set users(users: User[]) {
    this._localStorageService.setItem(StorageKey.USERS, users);
    this._users$.next(users);
  }

  public loadInitialUsers(): void {
    const storedUsers = this._localStorageService.getItem(StorageKey.USERS);
    if (storedUsers) {
      this._users$.next(storedUsers);
    } else {
      this.getUsersFromApi();
    }
  }

  public getUsersFromApi(): void {
    this._usersApiService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  public deleteUser(id: number): void {
    const updatedUsers = this._users$.value.filter(
      user => user.id !== id
    );
    this.users = updatedUsers;
  }

  public editUser(updatedUser: User) {
    const updatedUsers = this._users$.value.map(
      user => user.id === updatedUser.id ? updatedUser : user,
    );
    this.users = updatedUsers;
  }

  public addUser(userForm: User) {
    const updatedUsers = this._users$.value.concat(userForm);
    this.users = updatedUsers;
  }
}












