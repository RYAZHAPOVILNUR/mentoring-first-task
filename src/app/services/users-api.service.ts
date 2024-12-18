import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UsersListComponent} from "../components/users-list/users-list.component";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  readonly url = 'https://jsonplaceholder.typicode.com/users'

  constructor(private _http: HttpClient) {
  }

  getUsers() {
    return this._http.get<User[]>(this.url)
  }
}
