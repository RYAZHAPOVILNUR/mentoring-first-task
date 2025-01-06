import { Injectable, inject } from '@angular/core';
import { UserService } from './users.service';
import { User } from '../interfaces/User.interface';
import { UsersApiService } from './users-api-service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  readonly userServices = inject(UserService);
  readonly userApiServices = inject(UsersApiService);
  usersKey = 'users';
  data = [];

  constructor() {}

  setToStore() {
    const fromLocaleStorage = localStorage.getItem(this.usersKey);
    const pars = JSON.parse(fromLocaleStorage!);
    this.userServices.setUsers(pars);
  }

  setToLocale(): void {
    if (!localStorage.getItem(this.usersKey)) {
      const localeData = JSON.stringify(this.userServices.usersSubject$.value);
      localStorage.setItem(this.usersKey, localeData);
    }
  }

  editToLocale(): void {
    localStorage.clear();
    localStorage.setItem(
      this.usersKey,
      JSON.stringify(this.userServices.usersSubject$.value)
    );
  }

  clear(): void {
    localStorage.clear();
    this.userApiServices.getUsers().subscribe((response: User[]) => {
      if (!localStorage.getItem('users')) {
        this.userServices.setUsers(response);
        this.setToLocale();
      }
    });
  }
}
