import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UsersApiService {
    
    private readonly http = inject(HttpClient)
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

    public getUsersAPI(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}