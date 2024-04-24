import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modules/interfaces/user.interface';


@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    private readonly http = inject(HttpClient)

    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users'

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl)
    }
}