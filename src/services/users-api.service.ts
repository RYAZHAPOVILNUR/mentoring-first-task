import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "@models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  public getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  public postUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user);
  }

  public updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user);
  }

  public deleteUser(user: IUser): Observable<IUser> {
    return this.http.delete<IUser>(`${this.apiUrl}/${user.id}`);
  }
}
