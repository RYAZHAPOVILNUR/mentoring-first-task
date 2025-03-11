import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../components/user-list-component/user-list.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  api = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.api.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
