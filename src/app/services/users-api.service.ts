import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IUser} from "../models/user.interface";
import {HttpClient} from "@angular/common/http";
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private URL_API: string = 'https://jsonplaceholder.typicode.com/users';
  private localStorageKey: string = 'usersLocal';

  public entities$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public entitiesUserDetail$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient, private usersService: UsersService) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL_API}`);
  }

  getUser(id: number) {
    const storedUser = localStorage.getItem(this.localStorageKey);
    const url: string = `${this.URL_API}/${id}`;

    if (storedUser) {
      this.usersService.userDetail = (JSON.parse(storedUser)).find((el: IUser) => el.id === id);

      console.log(this.usersService.userDetail);

      this.entitiesUserDetail$.next(this.usersService.userDetail);
    } else {
      this.http.get<IUser>(url).subscribe({
        next: (data: IUser) => {
          this.usersService.userDetail = data;
          this.entitiesUserDetail$.next(this.usersService.userDetail);

          console.log('data', data);
        },
        error: err => console.log(err)
      })
    }
  }

  deleteUser(userId: number) {
   return this.http.delete(`${this.URL_API}/${userId}`);
  }

  editUser(user: IUser) {
    return this.http.put<IUser>(`${this.URL_API}/${user.id}`, user);
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.URL_API}`, user);
  }
}
