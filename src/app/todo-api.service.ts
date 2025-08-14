import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Todo } from "./interface/todo-interface";



@Injectable({providedIn: 'root'})

export class TodoApiService {
    readonly apiService = inject(HttpClient);

    getTodo(){
        return this.apiService.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
    }    

    
}