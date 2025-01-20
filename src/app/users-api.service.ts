import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class UsersApiService {
    readonly apiService = inject(HttpClient);

    getUsers() {
        return this.apiService.get('https://jsonplaceholder.typicode.com/users')
    }
}
