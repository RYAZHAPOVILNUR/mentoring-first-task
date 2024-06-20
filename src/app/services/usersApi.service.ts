import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

   public deleteUser(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  public addUser(user: User): Observable<User> {
    return this._httpClient.post<User>(this.apiUrl, user);
  }

  public editUser(user: User): Observable<User> {
    return this._httpClient.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
}
