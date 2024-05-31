import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { IUser } from '../types/users.interfase';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private readonly http = inject(HttpClient)
  private readonly url = inject(API_URL);

  public getUsers():Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url + 'users')
  }
}
