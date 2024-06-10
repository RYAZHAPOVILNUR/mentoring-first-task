import { EventEmitter, Injectable, inject } from '@angular/core';
import { UsersApiService } from './users-api-service.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private readonly usersApiService = inject(UsersApiService);
  private readonly localStorage = inject(LocalStorageService);

  private usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();

  loadUsers(): void {

    let userLS = this.localStorage.getUsers()

    if (userLS !== null) {
      this.usersSubject$.next(userLS);
    } else {
      this.usersApiService.getUsers().subscribe((users: User[]) => {
        this.usersSubject$.next(users);
        this.localStorage.setUsers(this.usersSubject$.value);
      });
    }
    
  }

  deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value
      .filter((user: User) => user.id !== id)
    )

    this.localStorage.removeUsers();
    this.localStorage.setUsers(this.usersSubject$.value);
  }

  createUser(user: User): void {
    this.usersSubject$.next(
      this.usersSubject$.value.concat([user])
    );
    this.localStorage.removeUsers();
    this.localStorage.setUsers(this.usersSubject$.value);
  }

  editUser(userData: User): void {
    this.usersSubject$.next(
      this.usersSubject$.value.map(user => {
        return user.id === userData.id ? userData : user;
      })
    )

    this.localStorage.removeUsers();
    this.localStorage.setUsers(this.usersSubject$.value);
  }
}
