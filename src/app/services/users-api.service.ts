import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  public readonly api: HttpClient = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.api.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
