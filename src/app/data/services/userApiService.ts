import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/userApiService";


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private http = inject(HttpClient)
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/'




  constructor() {

  }

  getApiUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users`)
  }
}

