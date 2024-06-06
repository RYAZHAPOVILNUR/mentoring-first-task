import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { __values } from 'tslib'

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  constructor(public http:HttpClient) {}

  public apiUrl = 'https://jsonplaceholder.typicode.com/users'

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }
}