import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {}
  setUsers(users: any[]): void {
    this.usersSubject.next(users);
  }
  deleteUser(id: number): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    this.usersSubject.next(updatedUsers);
  }
  
  addUser(user: any): void {
    const users = [...this.usersSubject.getValue(), user];
    this.usersSubject.next(users);
  }

  editUser(updatedUser: any): void {
    const users = this.usersSubject.getValue().map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    this.usersSubject.next(users);
  }
  
}
