import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {


  constructor(private http: HttpClient){ }

  public getUsers(): Observable<IUser[]>{
    const users = this.http.get('https://jsonplaceholder.typicode.com/users')
    return users as Observable<IUser[]>;
  }
}
