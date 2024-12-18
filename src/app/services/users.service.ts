import {inject, Injectable} from '@angular/core';
import {User} from "../models/user";
import {BehaviorSubject} from "rxjs";
import {UserForm} from "../models/form-user";
import {LocalstorageService} from "./localstorage.service";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users$ = new BehaviorSubject<User[]>([]);
  users = this.users$.asObservable();
  Storage = inject(LocalstorageService);

  getUsers(){
    let users = this.Storage.getUsers()
    if(users && users.length){
      this.users$.next(JSON.parse(users));
      return true;
    } else {
      localStorage.removeItem('users');
      return false;
    }
  }

  setUsers(users: User[]) {
    this.users$.next(users);
    this.Storage.setItems('users',this.users$.value);
  }

  deleteUser(userId: number) {
    const newUsers = this.users$.value.filter((user: User) => Number(user.id) !== userId);
    this.users$.next(newUsers);
    if(!newUsers.length){
      localStorage.removeItem('users');
    }
  }

  editUser(editedUser: User) {
    const editedUsers = this.users$.value.map((user: User) => {
      if(Number(editedUser.id) === Number(user.id)) {
        return editedUser;
      } else {
        return user;
      }
    });
    this.Storage.setItems('users',editedUsers);
    this.users$.next(editedUsers);
  }

  createUser(user: UserForm) {
    const newUser: User = {
      id: new Date().getTime(),
      ...user
    }
    const newUsers = [...this.users$.value,newUser];
    this.users$.next(newUsers);
    this.Storage.setItems('users',newUsers);
  }
}
