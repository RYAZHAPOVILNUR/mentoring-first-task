import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../app/Interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  
  usersSubject = new BehaviorSubject<User[]>([]);
  
  setUser(users: User[]) {
    this.usersSubject.next(users);
  }
  
  editedUser(editUser: User) {
    this.usersSubject.next(
      this.usersSubject.value.map((user) =>
        user.id === editUser.id ? { ...editUser } : user
      )
    );
  }

  deleteUser(id: number) {
    this.usersSubject.next(
      this.usersSubject.value.filter((item) => {
        if (id === item.id) {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  createUser(user: User) {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }
  
}
