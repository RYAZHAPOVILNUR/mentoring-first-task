import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class TodosApiService {
    readonly apiService = inject(HttpClient);

    getTodos() {
        return this.apiService.get('https://jsonplaceholder.typicode.com/todos')
    }
}
