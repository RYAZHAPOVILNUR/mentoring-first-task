import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  readonly apiService = inject(HttpClient);
  getUsers() {
    return this.apiService.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
