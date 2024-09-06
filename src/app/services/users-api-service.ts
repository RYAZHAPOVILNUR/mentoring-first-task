import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../data/interfaces/users.interface'

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http = inject(HttpClient)
  usersApiUrl = 'https://jsonplaceholder.typicode.com/users'

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersApiUrl}`)
  }

  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.usersApiUrl}/${id}`)
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersApiUrl}`, user)
  }

  public editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.usersApiUrl}/${user.id}`, user)
  }
}
