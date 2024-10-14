import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import User from '../interface/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class UserApiService {
  http = inject(HttpClient);
  private readonly baseUrl: string = "https://jsonplaceholder.typicode.com";

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`)
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.baseUrl}/${userId}`)
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }
  
}