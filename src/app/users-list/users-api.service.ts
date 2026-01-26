import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  readonly apiService = inject(HttpClient);

  getUsers(): Observable<User[]>  {
    return this.apiService.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
  
  deleteUser(userId: number) {
    return this.apiService.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
  }

  editUser(user: User) {
  return this.apiService.put<User>(
    `https://jsonplaceholder.typicode.com/users/${user.id}`,
    user
  );
}
}
