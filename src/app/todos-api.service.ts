import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TodosApiService {
    readonly apiServer = inject (HttpClient);

    getTodos() {
        return this.apiServer.get('https://jsonplaceholder.typicode.com/todos')
    }
}
