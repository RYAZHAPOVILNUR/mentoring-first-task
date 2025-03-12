import { AsyncPipe,NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy,Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "../todos-api.service";
import {TodoServive} from "../todos.service";
import { CreateTodoForm } from "../create-todo-form/create-todo-form.component"
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from "@angular/forms";

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

@Component({
    selector: 'app-todos-list',
    templateUrl:'./todos-list.component.html',
    styleUrls:['./todos-list.component.scss'],
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoForm,ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    readonly todosService = inject(TodoServive)

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: any) => {
              this.todosService.setTodos(response)
                
            }
        )
    }

    

    deletUser(id: number) {
        this.todosService.deleteTodo(id)
          }



          createTodo(formItem: Todo) {
            this.todosService.createTodo({
                id: new Date().getTime(),
                title: formItem.title,
                userId: formItem.userId,
                completed: formItem.completed
            });
          }

        }









/*

import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "../todos-api.service";
import { ChangeDetectionStrategy } from "@angular/core";


export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

@Component({
    selector: 'app-todos-list',
    templateUrl:'./todos-list.component.html',
    styleUrls:['./todos-list.component.scss'],
    standalone: true,
    imports: [NgFor, TodoCardComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    todos: Todo[] = [];

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: any) => {
                this.todos = response;
                // console.log('TODOS:', this.todos)
            }
        )
    }



    deletUser(id: number) {
        this.todos = this.todos.filter(
            //@ts-ignore
            item => item.id !== id
        )
          }


    // deleteTodo(id: any) {
    //     this.todos = this.todos.filter(
    //         todo => {
    //             if (id === todo.id) {
    //                 return false;
    //             } else {
    //                 return true;
    //             }
    //         }
    //     )
    // }
}
*/ 











// import { NgFor } from "@angular/common";
// import { HttpClient } from "@angular/common/http";
// import { Component, inject } from "@angular/core";
// import { RouterLink } from "@angular/router";
// import { TodoCardComponent } from "../todo-card/todo-card.component";

// export interface Todo {
//     userId: number;
//     id: number;
//     title: string;
//     completed: boolean;
// }



// @Component({
//     selector: 'app-todos-list',
//     templateUrl:'./todos-list.component.html',
//     styleUrls:['./todos-list.component.scss'],
//     standalone: true,
//     imports: [NgFor,TodoCardComponent]
// })
// export class TodolistComponent {
//     readonly todosApiService = inject(this.TodosApiService);todos:Todo[] = [];
// constructor() {
//     this.todosApiService.getTodos().subscribe(
//        (response: any) => {
//         this.todos = response;
//         // console.log('USERS:', this.users)
//        }
//      )
//   }  
//   deletTodo(id: any) {
// this.todos = this.todos.filter(
//    todo =>{
//     if(id === todo.id) {
//         return false;
//     }else{
//         return true;
//          }

//        }
//       )
//    } 
//  }
