import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../models/user.interface";

@Injectable({providedIn: 'root'})
export class UsersApiService {
  private url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  public getUsers() {
    return this.http.get<User[]>(this.url);
  }
}