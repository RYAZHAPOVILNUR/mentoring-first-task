import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http = inject(HttpClient);
  private userApi = 'https://jsonplaceholder.typicode.com/';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userApi}users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userApi}users`, user);
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.userApi}users/${userId}`);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userApi}users/${user.id}`, user);
  }
}
