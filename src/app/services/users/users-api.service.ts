import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../_model/users';

@Injectable({
    providedIn: 'root',
})
export class UsersApiService {
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';
    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    createUser(data: User): Observable<User[]> {
        return this.http.post<User[]>(this.apiUrl, data);
    }

    updateUser(data: User): Observable<User[]> {
        return this.http.post<User[]>(this.apiUrl, data);
    }
    deleteUser(id: number): Observable<User[]> {
        return this.http.post<User[]>(this.apiUrl, id);
    }
}
