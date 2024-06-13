import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { User } from "@app/models/user.interface";
import { Observable } from "rxjs";

export const getUsersApi = (): Observable<User[]> => {
    const http = inject(HttpClient);
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    return http.get<User[]>(apiUrl);
}

export const postUserApi = (user: User): Observable<User> => {
    const http = inject(HttpClient);
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    return http.post<User>(apiUrl, user);
}

export const putUserApi = (user: User): Observable<User> => {
    const http = inject(HttpClient);
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    return http.put<User>(apiUrl + "/" + user.id, user);
}

export const deleteUserApi = (user: User): Observable<User> => {
    const http = inject(HttpClient);
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    return http.delete<User>(apiUrl + "/" + user.id);
}