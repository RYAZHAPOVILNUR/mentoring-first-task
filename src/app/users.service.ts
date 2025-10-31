import { Injectable } from '@angular/core';
import { User } from './users-list/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();

  setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }

  editUser(editUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user: User) => {
        if (user.id === editUser.id) {
          return editUser;
        } else {
          return user;
        }
      })
    );
  }

  createUser(user: User) {
    const existingUser = this.usersSubject$.value.find(
      (currentElement: User) => currentElement.email === user.email
    );
    if (existingUser) {
      alert('Пользователь с таким EMAIL уже существует');
    } else {
      this.usersSubject$.next([...this.usersSubject$.value, user]);
      alert('Новый пользователь добавлен');
    }
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item: User) => item.id !== id)
    );
  }
}