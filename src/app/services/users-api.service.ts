import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({providedIn: 'root'})
export class UsersApiService {
  private readonly apiService = inject(HttpClient);
  private readonly apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.apiUrl);
  }
}
