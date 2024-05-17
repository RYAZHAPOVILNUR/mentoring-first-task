import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { TUserDTO } from "../../libs/core/data-access/src/lib/users-data.models";

export class UsersApiService {
  private usersUrl: string = 'https://jsonplaceholder.typicode.com/users';
  private http: HttpClient = inject(HttpClient);

  public getUsers(): Observable<TUserDTO[]>{
    return this.http.get<TUserDTO[]>(this.usersUrl);
  }
}

