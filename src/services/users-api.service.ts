import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "@models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  public getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }
}
