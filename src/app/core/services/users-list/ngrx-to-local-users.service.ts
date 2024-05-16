import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { UserService } from './users-api.service';
import { UsersType } from '../../../shared/types/users-types.type';

@Injectable({ providedIn: 'root' })

export class ngrxLocalUsersService {
  constructor(private apiServise: UserService) { }

  getAllUsers(): Observable<UsersType[]> {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('users');
      if (data && JSON.parse(data).length > 0) {
        return of(JSON.parse(data));
      } else {
        return this.apiServise.getAllUsers().pipe(
          tap(users => {
            localStorage.setItem('users', JSON.stringify(users));
            this.getAllUsers()
          })
        );
      }
    } else {
      return of([]);
    }
  }

  addUser(user: UsersType): Observable<UsersType> {
    const data = localStorage.getItem('users')
    if (data) {
      let newData = JSON.parse(data)
      newData.push(user)
      localStorage.setItem('users', JSON.stringify(newData))
      return of(user)
    }
    else return this.apiServise.getAllUsers().pipe(
      tap(users => {
        users.push(user)
        const newData = users
        localStorage.setItem('users', JSON.stringify(newData))
      }),
      map(() => user)
    )
  }

  getUserById(id: number): Observable<UsersType> {
    const data = localStorage.getItem('users')
    if (data) {
      const user: UsersType = JSON.parse(data).find((user: { id: number }) => user.id === id)
      return of(user)
    }
    else return this.apiServise.getAllUsers().pipe(
      tap(users => {
        localStorage.setItem('users', JSON.stringify(users))
      }),
      map(users => users.find(user => user.id === id) as UsersType)
    )
  }

  deleteUser(id: number): Observable<number> {
    const data = localStorage.getItem('users')
    if (data) {
      const localData: UsersType[] = JSON.parse(data)
      const newData: UsersType[] = localData.filter(user => user.id != id)
      localStorage.setItem('users', JSON.stringify(newData));
      return of(id);
    }
    else {
      this.apiServise.getAllUsers().pipe(
        tap(users => {
          const newData: UsersType[] = users.filter(user => user.id != id)
          localStorage.setItem('users', JSON.stringify(newData))
        }),
      )
      return of(id);
    }
  }

  updateUser(user: UsersType): Observable<UsersType> {
    const data = localStorage.getItem('users')
    if (data) {
      const localUsers: UsersType[] = JSON.parse(data)
      const filterUsers: UsersType[] = localUsers.filter(elem => elem.id !== user.id)
      filterUsers.push(user)
      const newData = filterUsers
      localStorage.setItem('users', JSON.stringify(newData))
      return of(user)
    }
    else
      return this.apiServise.getAllUsers().pipe(
        tap(users => {
          const filterUsers: UsersType[] = users.filter(user => user.id !== user.id)
          filterUsers.push(user)
          const newData = filterUsers
          localStorage.setItem('users', JSON.stringify(newData))
        }),
        map(() => user)
      )
  }

}
