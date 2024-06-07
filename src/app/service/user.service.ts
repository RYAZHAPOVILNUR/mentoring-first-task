import { Injectable } from '@angular/core';
import { UserApiService } from './userApiService';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, of } from 'rxjs';
import { User } from '../interface/users.interface';
import { LocalStorageService } from './localStorageService';

@Injectable({
  providedIn: 'root',  
})
export class UserService {
  public api = inject(UserApiService);
  private readonly userSubject$ = new BehaviorSubject<User[]>([]);
  public user = this.userSubject$;
  public users$ = this.user.asObservable();
  public localService = inject(LocalStorageService)

  
  
  public set setUsers(users: User[]) {
    this.userSubject$.next(users);

  }

  public loadUsers() {
    const currenLocal= this.localService.getItem('data')
    if(currenLocal){
       this.userSubject$.next(currenLocal)
    }else{
      this.api.getUsers().subscribe((data: any) => {
        this.userSubject$.next(data)
    })
  }
}

  private get getUsers() {
    return this.userSubject$.getValue();
  }

 

  deleteUser(id: number) {
    this.userSubject$.next(
      this.getUsers.filter((user) => user.id !== id)
    );
    this.localService.setItem('data', this.getUsers.filter((user) => user.id !== id))
  }

  public addUser(user: User) {
    const users = this.userSubject$.value;
    const maxId = users.length;
    const newUser = { ...user, id: maxId + 1 };
    this.userSubject$.next([...users, newUser]);
    this.localService.setItem('data', [...users, newUser])
  }

  public updateUser(user: User) {
    const updatedUsers = this.userSubject$.getValue().
    map((existingUser) => {
      if (existingUser.id === user.id) {
        return user;
      } else {
        return existingUser;
      }
    });
    this.userSubject$.next(updatedUsers);
    this.localService.setItem('data', updatedUsers)
  }

  public generationId() {
    const id = of(this.getUsers).pipe(
      map((userArray) => {
        const maxId = Math.max(...userArray.map((user) => user.id));
        return maxId + 1;
      })
    );
    id.subscribe((response) => console.log('новый айдишник', response));
  }
}
