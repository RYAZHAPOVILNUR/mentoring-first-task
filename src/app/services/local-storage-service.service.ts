import { Injectable } from '@angular/core';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setUsers(key: string, users: User[]): void {
    localStorage.setItem(key, JSON.stringify(users));
  }

  addUser(key: string, user: User): void {
    const existingUsers = localStorage.getItem(key);
    let usersArray: User[] = [];
    
    if (existingUsers) {
      usersArray = JSON.parse(existingUsers);
      if (!Array.isArray(usersArray)) {
        usersArray = [];
      }
    }

    usersArray.push(user);
    localStorage.setItem(key, JSON.stringify(usersArray));
  }

  getUsers(users: string): User[] {
    const value = localStorage.getItem(users);
    return value ? JSON.parse(value) : [];
  }

  editUser(key: string, updatedUser: User): void {
    const users = this.getUsers(key);
    const updatedUsers = users.map(user => {
      if (user.id === updatedUser.id) {
        return { ...user, ...updatedUser };
      } else {
        return user;
      }
    })
    this.setUsers(key, updatedUsers)
  }

  deleteUser(key: string, id: string): void {
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      return;
    }
    const parsedData: User[] = JSON.parse(storedData);
    const index = parsedData.findIndex((item: User) => String(item.id) === id);
  
    if (index !== -1) {
      parsedData.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(parsedData));
    }
  }
}
