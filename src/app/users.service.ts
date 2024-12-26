import { Injectable } from '@angular/core';
import { User } from './interface/user.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersSubject = new BehaviorSubject<User[]>([]);
  users = this.usersSubject.asObservable();
  private localStorageKey = 'users'

  constructor(private usersApiService: UsersApiService) {
    const storedUsers = localStorage.getItem(this.localStorageKey)
    if (storedUsers) {
      this.usersSubject.next(JSON.parse(storedUsers))
    } else {
      this.usersApiService.getUsers().pipe(
        tap(users => {
          this.setUsers(users);
        })
      ).subscribe()
    }
  }

  private saveToLocalStorage(users: User[]) {
    localStorage.setItem(this.localStorageKey,
      JSON.stringify(users)
    )
  }

  getUsers(): User[] {
    return this.usersSubject.value
  }

  setUsers(users: User[]) {
    this.usersSubject.next(users);
    this.saveToLocalStorage(users)
  }


  editUser(editedUser: User) {
    this.usersSubject.next(
      this.usersSubject.value.map((user) => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      })
    );
    this.saveToLocalStorage(this.usersSubject.value);
  }

  createUser(user: User) {
    const userIsExisting = this.usersSubject.value.find(
      (currentElement) => currentElement.email === user.email
    );

    if (userIsExisting) {
      alert('Такой пользователь уже существует');
    } else {
      this.usersSubject.next([...this.usersSubject.value, user]);
      this.saveToLocalStorage(this.usersSubject.value);
      alert('Новый пользователь успешно добавлен');
    }
  }

  deleteUser(id: number) {
    this.usersSubject.next(
      this.usersSubject.value.filter(item => item.id !== id)
    );
    this.saveToLocalStorage(this.usersSubject.value);
  }
}

