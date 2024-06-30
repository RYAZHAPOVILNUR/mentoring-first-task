import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly LOCAL_STORAGE_KEY = 'users';
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject$.asObservable();

  constructor(
    private usersApiService: UsersApiService,
    private localStorageService: LocalStorageService
  ) {}

  loadUsers(): void {
    const localStorageUsers: User[] | null = this.localStorageService.getItem(
      this.LOCAL_STORAGE_KEY
    );
    if (localStorageUsers && localStorageUsers.length > 0) {
      this.usersSubject$.next(localStorageUsers);
    } else {
      this.usersApiService.getUsers().subscribe((data: User[]) => {
        this.usersSubject$.next(data);
        this.localStorageService.setItem(this.LOCAL_STORAGE_KEY, data);
      });
    }
  }

  removeUser(userId: number): void {
    const updatedUsers = this.usersSubject$.value.filter(
      (user) => user.id !== userId
    );
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.setItem(this.LOCAL_STORAGE_KEY, updatedUsers);
  }

  addUser(newUser: User): void {
    const updatedUsers = [...this.usersSubject$.value, newUser];
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.setItem(this.LOCAL_STORAGE_KEY, updatedUsers);
  }

  editUser(editUser: User): void {
    const updatedUsers = this.usersSubject$.value.map((user) =>
      user.id === editUser.id ? editUser : user
    );
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.setItem(this.LOCAL_STORAGE_KEY, updatedUsers);
  }
}
