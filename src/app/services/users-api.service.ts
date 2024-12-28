import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../Interfaces/IUser";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersApiService {

  public readonly apiService: HttpClient = inject(HttpClient);

  public getUsers(): Observable<IUser[]> {
    return this.apiService.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
