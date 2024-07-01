import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserApiService } from './user-api.service';
import { User } from '../../user.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  private readonly userApiService = inject(UserApiService);
  private readonly localStorageService = inject(LocalStorageService);

  deleteUser(id: number): void {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: User) => user.id !== id)
    );
  }

  loadUsers(): void {
    this.userApiService.getUsers().subscribe((data: User[]) => {
      if (this.localStorageService.getItem('users')) {
      } else {
        this.usersSubject$.next(data);
        this.localStorageService.setItem('users', data);
      }
    });
  }

  addUser(userToAdd: User): void {
    return this.usersSubject$.next([...this.usersSubject$.value, userToAdd]);
  }

  editUser(editedUser: User): void {
    const edited = this.usersSubject$
      .getValue()
      .map((current) => (current.id === editedUser.id ? editedUser : current));
    this.usersSubject$.next(edited);
    this.localStorageService.setItem('users', edited);
  }
}
