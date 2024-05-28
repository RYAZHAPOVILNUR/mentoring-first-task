import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UsersApiService {
    private APIUrl = 'https://jsonplaceholder.typicode.com/users';
    
    constructor(private http: HttpClient) {}

    getUsersAPI(): Observable<User[]> {
        console.log('Fetching users from API:', this.APIUrl);
        return this.http.get<User[]>(this.APIUrl);
    }
}