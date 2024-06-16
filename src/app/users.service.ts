import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
  
})
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>(
    this.loadFromLocalStorage()
  );
  users$ = this.usersSubject.asObservable();

  constructor() {}

  private saveToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  private loadFromLocalStorage(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
    this.saveToLocalStorage(users);
  }

  deleteUser(id: number): void {
    const users = this.usersSubject.getValue().filter((user) => user.id !== id);
    this.usersSubject.next(users);
    this.saveToLocalStorage(users);
  }

  addUser(user: User): void {
    const users = [...this.usersSubject.getValue(), user];
    this.usersSubject.next(users);
    this.saveToLocalStorage(users);
  }

  editUser(updatedUser: User): void {
    const users = this.usersSubject
      .getValue()
      .map((user) => (user.id === updatedUser.id ? updatedUser : user));
    this.usersSubject.next(users);
    this.saveToLocalStorage(users);
  }
}
