import { inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from '../data/interfaces/users.interface'
import { UsersApiService } from './users-api-service'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersSubject$: BehaviorSubject<User[]> =
    new BehaviorSubject<User[]>([])
  private userApiService = inject(UsersApiService)
  public readonly users$ = this.usersSubject$.asObservable()
  public localStorageService = inject(LocalStorageService)

  public generateNewId(users: User[]): number {
    const maxId = users.reduce(
      (max, user) => (user.id > max ? user.id : max),
      0
    );
    return maxId + 1
  }

  public loadUsers(): void {
    const localUsers: User[] | null = this.localStorageService.getUsers()
    if (localUsers) {
      this.usersSubject$.next(localUsers)
    } else {
      this.userApiService.getUsers().subscribe({
        next: (users: User[]) => {
          this.usersSubject$.next(users)
          this.localStorageService.setUsers(users)
        },
        error: error => {
          console.error('Error loading users:', error)
        },
      })
    }
  }

  public updateUser(updatedUser: User): void {
    const updatedUsers = this.usersSubject$.value.map(user =>
      user.id === updatedUser.id ? updatedUser : user,
    )
    this.usersSubject$.next(updatedUsers)
    this.localStorageService.setUsers(updatedUsers)
  }

  public addUser(user: User): void {
    const updatedUsers = [
      ...this.usersSubject$.value,
      { ...user, id: this.generateNewId(this.usersSubject$.value) }
    ];
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.setUsers(updatedUsers);
  }
}
