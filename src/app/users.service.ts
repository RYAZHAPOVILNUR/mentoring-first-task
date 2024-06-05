import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<any[]>(
    this.loadFromLocalStorage()
  );
  users$ = this.usersSubject.asObservable();

  constructor() {}

  private saveToLocalStorage(users: any[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  private loadFromLocalStorage(): any[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  setUsers(users: any[]): void {
    this.usersSubject.next(users);
    this.saveToLocalStorage(users);
  }

  deleteUser(id: number): void {
    const users = this.usersSubject.getValue().filter((user) => user.id !== id);
    this.usersSubject.next(users);
    this.saveToLocalStorage(users);
  }

  addUser(user: any): void {
    const users = [...this.usersSubject.getValue(), user];
    this.usersSubject.next(users);
    this.saveToLocalStorage(users);
  }

  editUser(updatedUser: any): void {
    const users = this.usersSubject
      .getValue()
      .map((user) => (user.id === updatedUser.id ? updatedUser : user));
    this.usersSubject.next(users);
    this.saveToLocalStorage(users);
  }
}
