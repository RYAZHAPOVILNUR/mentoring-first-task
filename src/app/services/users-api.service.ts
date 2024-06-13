import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@models/user.interface";

@Injectable({ providedIn: 'root' })
export class UsersApiService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

    public getUsersApi(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    public postUserApi(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    public putUserApi(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
    }

    public deleteUserApi(user: User): Observable<User> {
        return this.http.delete<User>(`${this.apiUrl}/${user.id}`);
    }
}