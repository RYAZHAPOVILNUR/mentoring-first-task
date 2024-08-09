import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../types/user.types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
