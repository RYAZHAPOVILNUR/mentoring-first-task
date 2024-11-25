import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IUser } from './users-list/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  usersApiService = inject(HttpClient);
  public getUsers(): Observable<IUser[]> {
    return this.usersApiService.get<IUser[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
}
