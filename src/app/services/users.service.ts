import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly STORAGE_KEY = 'users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const storedUsers = localStorage.getItem(this.STORAGE_KEY);
    if (storedUsers) {
      this.usersSubject.next(JSON.parse(storedUsers));
    }
  }

  private saveToStorage(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
    this.saveToStorage(users);
  }

  addUser(user: User): void {
    const currentUsers = this.usersSubject.value;
    this.setUsers([...currentUsers, user]);
  }

  editUser(updatedUser: User): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    this.setUsers(updatedUsers);
  }

  deleteUser(id: number): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    this.setUsers(updatedUsers);
  }
}
