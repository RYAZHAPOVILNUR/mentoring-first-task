import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private userUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {
    console.log(this.userUrl);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[    ]>(this.userUrl);
  }
}
