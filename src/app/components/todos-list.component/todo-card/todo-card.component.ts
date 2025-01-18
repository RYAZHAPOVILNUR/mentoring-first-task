import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgFor } from "@angular/common";
import { Todo } from "../../../interfaces/todos.interface";

@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    standalone: true,
    imports: [NgFor],
})

export class TodoCardComponent {

    @Input ()
    todo!: Todo

    @Output ()
    deleteTodo = new EventEmitter();

    onDeleteTodo(todoId:number) {
        this.deleteTodo.emit(todoId)
    }

}