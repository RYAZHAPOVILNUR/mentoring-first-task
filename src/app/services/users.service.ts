import { Injectable, inject } from '@angular/core';
import { IUser } from '../types/users.interfase';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageJwtService } from './local-storage-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private usersApi = inject(UsersApiService);
  private localStore = inject(LocalStorageJwtService);

  private subjectUsers = new BehaviorSubject<IUser[]>([]);
  public users$ = this.subjectUsers.asObservable();
  constructor() { }

  public loadUsers() {
    this.usersApi.getUsers().subscribe( (users:IUser[]) => {
      this.subjectUsers.next(users);
      this.localStore.setItem(JSON.stringify(users));
    });
  }

  public loadUsersLocalStorage(users:IUser[]) {
    this.subjectUsers.next(users)
  }

  public deleteUsers(id:number) {
    this.subjectUsers.next(this.subjectUsers.value.filter( user => user.id !== id));
    this.localStore.setItem(JSON.stringify(this.subjectUsers.value));
  }

  public addUser(newUser:IUser) {
    this.subjectUsers.next([...this.subjectUsers.value,newUser]);
    this.localStore.setItem(JSON.stringify(this.subjectUsers.value));
  }

  public editUser(user:IUser) {
    this.subjectUsers.next(this.subjectUsers.value.map(el=> el.id === user.id ? user : el));
    this.localStore.setItem(JSON.stringify(this.subjectUsers.value));
  }
}
