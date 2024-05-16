import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserEntity } from '../entities/UserEntity';
import { UsersApiService } from './users-api.service';
import { LocalStorageUsersService } from './local-storage-users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly api = inject(UsersApiService);
  private readonly localStorageUserService = inject(LocalStorageUsersService);

  private readonly _users$ = new BehaviorSubject<UserEntity[]>([]);
  public readonly users$ = this._users$.asObservable();

  constructor() {
    this.loadUsers();
  }

  private set users(users: UserEntity []) {
    this._users$.next(users);
    this.localStorageUserService.setItem(users);
  }

  private get users(): UserEntity [] {
    return this._users$.value;
  }

  private loadUsers() {
    const localStorageUsers = this.localStorageUserService.getItem();
    if (localStorageUsers && localStorageUsers.length > 0) {
      this._users$.next(localStorageUsers)
    } else {
      this.api.users.subscribe(
        (response: UserEntity[]) => {
          this._users$.next(response)
        }
      )
    }
  }

  public deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id)
  }

  public addUser(userToAdd: UserEntity) {
    userToAdd.id = new Date().getTime();
    this.users = [...this.users, userToAdd];
  }

  public editUser(userToEdit: UserEntity) {
    this.users = this.users.map(user => user.id === userToEdit.id ? userToEdit : user)
  }
}
