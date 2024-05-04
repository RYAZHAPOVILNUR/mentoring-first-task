import { Injectable } from '@angular/core';
import { User } from '../interface/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users: User[] = [];

  constructor() {
    this.users = this.getUsersFromLocalStorage();
  }

  getUsersFromLocalStorage(): User[] {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  setUsers(users: User[]): void {
    this.users = users;
    this.getUsersFromLocalStorage();
  }

  editUser(updatedUser: User): void {
    this.users = this.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user,
    );
    this.saveUsersToLocalStorage();
  }

  addUser(user: User): void {
    this.users = [...this.users, user];
    this.saveUsersToLocalStorage();
  }

  deleteUser(id: number | undefined): void {
    this.users = this.users.filter((user) => user.id !== id);
    this.saveUsersToLocalStorage();
  }
}
