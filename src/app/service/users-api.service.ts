import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private api = 'https://jsonplaceholder.typicode.com/users'
  constructor( private http: HttpClient ) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api)
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.api}/${user.id}`, user)
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.api, user)
  }
  returnUser(): Observable<User[]> {
    return this.http.get<User[]>(this.api)
  }
}
