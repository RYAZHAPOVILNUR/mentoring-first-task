import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user';
import { UsersApiService } from './users-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersSubject$ = new BehaviorSubject<IUser[]>([])
  public readonly users$ = this.usersSubject$.asObservable()

  constructor(
    private usersApiService: UsersApiService,
    private localStorageService: LocalStorageService
  ) { }

  public loadUsers(): void {
    this.usersApiService.getUsers().subscribe(
      (response: IUser[]) => {
        this.usersSubject$.next(response)
        this.saveUsersToLocalStorage(response)
      },
      (error) => {
        console.error('Ошибка загрузки пользователей:', error)
      }
    )
  }

  public loadLocalUsers(): void {
    const storedUsers = this.localStorageService.getItem('users');
    if (storedUsers) {
      try {
        const users = JSON.parse(storedUsers);
        if (users.length > 0) {
          this.usersSubject$.next(users);
        } else {
          this.loadUsers(); 
        }
      } catch (error) {
        console.error('Ошибка парсинга хранимых пользователей:', error);
        this.loadUsers();
      }
    } else {
      this.loadUsers();
    }
  }

  private saveUsersToLocalStorage(users: IUser[]): void {
    this.localStorageService.setItem('users', JSON.stringify(users))
  }
  public deleteUser(id: number): void {
    const users = [...this.usersSubject$.value]
    const index = users.findIndex(user => user.id === id)
    if (index !== -1) {
      users.splice(index, 1)
      this.usersSubject$.next(users)
      this.saveUsersToLocalStorage(users)
    }
  }

  public addUser(user: IUser): void {
    const users = [...this.usersSubject$.value, user]
    this.usersSubject$.next(users)
    this.saveUsersToLocalStorage(users)
  }

  public editUser(user: IUser): void {
    const users = this.usersSubject$.value.map(u => u.id === user.id ? user : u)
    this.usersSubject$.next(users)
    this.localStorageService.setItem('users', JSON.stringify([...this.usersSubject$.value]))
    
  
  }

} 
