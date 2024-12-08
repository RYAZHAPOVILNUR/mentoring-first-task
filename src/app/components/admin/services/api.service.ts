import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../components/users-list/users-list.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiService = inject(HttpClient)
  private url = 'https://jsonplaceholder.typicode.com/users';
  constructor() { }

  getData(): Observable<User[]> {
    return this.apiService.get<User[]>(this.url,{
      params: {
        _limit: 5
      }
    })
  }
}
