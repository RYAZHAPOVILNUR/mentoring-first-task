import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UsersApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  
  public getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.apiUrl);
  }
}
