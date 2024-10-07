import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInterface} from "../types/user.interface";

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {

  constructor(private httpClient: HttpClient) {
  }

  loadUsers(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>('https://jsonplaceholder.typicode.com/users')
  }
}
