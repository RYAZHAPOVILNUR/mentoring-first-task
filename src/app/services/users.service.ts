import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly KEY_ITEM = 'users';
  private readonly usersApiService = inject(UsersApiService);
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();

  public loadUsers(): void {
    const localUsers = localStorage.getItem(this.KEY_ITEM);
    if (localUsers && localUsers !== '[]') {
      this.usersSubject$.next(JSON.parse(localUsers));
    } else {
      this.usersApiService.getUsers().subscribe((users: User[]) => {
        this.usersSubject$.next(users);
        this.localStorageSetItems();
      });
    }
  }

  public deleteUser(id: number): void {
    const users = this.usersSubject$.value.filter((user) => user.id !== id);
    this.usersSubject$.next(users);
    this.localStorageSetItems();
  }

  public addUser(user: User): void {
    user.id = Date.now();
    this.usersSubject$.next([...this.usersSubject$.value, user]);
    this.localStorageSetItems();
  }

  public editUser(editedUser: User): void {
    const users = this.usersSubject$.getValue().map((user) => {
      if (user.id === editedUser.id) {
        return editedUser;
      } else {
        return user;
      }
    });
    this.usersSubject$.next(users);
    this.localStorageSetItems();
  }

  private localStorageSetItems(): void {
    localStorage.setItem(
      this.KEY_ITEM,
      JSON.stringify(this.usersSubject$.value),
    );
  }
}
