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
}
