import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IUser} from "../interfaces/iuser";
import {Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

interface IUsersApiService {
  getUsers(): Observable<IUser[]>;
  getUser(id: number): Observable<IUser>;
}

@Injectable({
  providedIn: 'root'
})
export class UsersApiService implements IUsersApiService{
  private readonly apiRoute = "https://jsonplaceholder.typicode.com";
  readonly httpClient: HttpClient = inject(HttpClient);
  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.apiRoute}/users`);
  }
  getUser(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.apiRoute}/users/${id}`)
  }
}
