import { inject, Injectable } from '@angular/core';
import { UsersApiService } from './users-api-service.service';
import { User } from '../interfaces/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  readonly users$ = this.usersSubject$.asObservable();

  getUsers(): Observable<User[]>{
    const localUsers = this.localStorageService.getUsers("users");
    if (localUsers && Array.isArray(localUsers) && localUsers.length > 0) {
      this.usersSubject$.next(localUsers);
      return this.users$;
    } else {
      this.usersApiService.getUsers().subscribe(
        (users) => {
          this.usersSubject$.next(users);
          this.localStorageService.setUsers("users", users);
        }
      );
      return this.users$
    }
    
  };

  deleteUser(id:number): void {
    this.localStorageService.deleteUser("users", id.toString());
    this.usersSubject$.next(
      this.usersSubject$.value.filter(user => user.id !== id))
  };

  createUser(user:User): void {
    if (this.usersSubject$.value.find(email => email.email == user.email) !== undefined) {
      alert("Email is already exist");
    } else {
      const newUser: User = {...user, id: Date.now()};
      this.usersSubject$.next([...this.usersSubject$.value, newUser]);
      this.localStorageService.addUser("users", newUser);
    }
  };

  editUser(updatedUser:User): void {
    this.usersSubject$.next(
      this.usersSubject$.value.map(user =>
        user.id === updatedUser.id ? {...user, ...updatedUser} : user
      )
    );
    this.localStorageService.editUser("users", updatedUser);
  };
}
