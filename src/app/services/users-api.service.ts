import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IUser } from "../interface/user";
import { map, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private readonly http = inject(HttpClient);
  readonly url = 'https://jsonplaceholder.typicode.com/users';

  public getUsers() {
    return this.http.get<IUser[]>(this.url)
  }

  public addUser(user: IUser) {
    return this.getUsers().pipe(
      map(users => {
        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
        const newUserId = maxId + 1;
        const newUser: IUser = {...user, id: newUserId };
        return newUser;
      }),
      switchMap(newUser => this.http.post<IUser>(this.url, newUser))
    )
  }

  public deleteUser(id: number) {
    const urlDelete = `${this.url}/${id}`;
    return this.http.delete(urlDelete)
  }

  public editUser(updatedUser: IUser) {
    const urlEdit = `${this.url}/${updatedUser.id}`
    return this.http.put<IUser>(urlEdit, updatedUser)
  }
}





