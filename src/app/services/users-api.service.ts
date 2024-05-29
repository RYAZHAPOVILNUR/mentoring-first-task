import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UsersApiService {
    private http = inject(HttpClient)
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    getUsersAPI(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}