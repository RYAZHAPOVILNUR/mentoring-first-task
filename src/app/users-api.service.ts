import {first, Observable} from 'rxjs';
import { User } from './user.interface';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly http = inject(HttpClient);
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
  constructor() {
    this.getUsers().pipe(first()).subscribe(console.log);
  }
}
