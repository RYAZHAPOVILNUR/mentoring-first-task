import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private readonly apiService = inject(HttpClient)
  private readonly apiUrl = "https://jsonplaceholder.typicode.com/"
  private readonly resourse = "users"

  getUsers(): Observable<User[]>{
    return this.apiService.get<User[]>(this.apiUrl + this.resourse);
  }
} 
