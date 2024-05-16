import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../entities/UserEntity';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private readonly httpClient = inject(HttpClient)
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users'

  constructor() { }

  public get users(): Observable<UserEntity[]> {
    return this.httpClient.get<UserEntity[]>(this.apiUrl);
  }
}
