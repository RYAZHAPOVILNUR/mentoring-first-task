import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, map, of} from "rxjs";
import { UsersApiService } from "./users-api.service";
import { IUser } from "../interfaces/iuser";
import { LocalStorageService } from "./local-storage.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersObject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersObject$.asObservable();
  private readonly localStorageKey = 'users';
  private _localStorageService = inject(LocalStorageService);

  constructor(private _usersApiService: UsersApiService) { }

  loadUsers(): Observable<IUser[]> {
    const usersFromLocalStorage = this._localStorageService.getObjects<IUser>(this.localStorageKey);
    if (usersFromLocalStorage.length > 0) {
      this.usersObject$.next(usersFromLocalStorage);
      return of(usersFromLocalStorage);
    } else {
      return this._usersApiService.getUsers().pipe(
        map((data: IUser[]) => {
          this.usersObject$.next(data);
          data.forEach(user => this._localStorageService.saveObject(this.localStorageKey, user));
          return data;
        })
      );
    }
  }

  addUser(user: IUser): Observable<void> {
    this._localStorageService.saveObject(this.localStorageKey, user);
    const updatedUsers = [...this.usersObject$.value, user];
    this.usersObject$.next(updatedUsers);
    return of(void 0);
  }

  updateUser(user: IUser): Observable<void> {
    const users = this.usersObject$.value.map(u =>
      u.id === user.id ? { ...u, ...user } : u
    );

    this._localStorageService.updateObject(this.localStorageKey, user);
    this.usersObject$.next(users);

    return of(void 0);
  }


  deleteUser(id: number): Observable<void> {
    this._localStorageService.deleteObject(this.localStorageKey, id);
    const updatedUsers = this.usersObject$.value.filter(user => user.id !== id);
    this.usersObject$.next(updatedUsers);
    return of(void 0);
  }
}
