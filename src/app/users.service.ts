import { Injectable } from '@angular/core';
import { User } from './interfaces/users.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    [],
  );
  users$: Observable<User[]> = this.usersSubject$.asObservable();

  setUsers(users: User[]): void {
    this.usersSubject$.next(users);
  }

  editUser(editUser: User): void {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user: User) => {
        if (user.id === editUser.id) {
          return editUser;
        } else {
          return user;
        }
      }),
    );
  }

  createUser(user: User): void {
    const existingUser = this.usersSubject$.value.find(
      (currentElement: User) => currentElement.email === user.email,
    );
    if (existingUser) {
      alert('Пользователь с таким EMAIL уже существует');
    } else {
      this.usersSubject$.next([...this.usersSubject$.value, user]);
      alert('Новый пользователь добавлен');
    }
  }

  deleteUser(id: number): void {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item: User) => item.id !== id),
    );
  }
}
