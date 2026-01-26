import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "../models/todos.model";

@Component({
    selector: 'app-todos-card',
    templateUrl: './todos-card.component.html',
    styleUrl: './todos-card.component.scss',
    standalone: true,
})
export class TodosCardComponent {
    @Input() todo!: Todo;

    @Output() deleteTodo = new EventEmitter();

    @Output() editTodo = new EventEmitter<Todo>();

    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId);
    }
    onEditTodo() {
        this.editTodo.emit(this.todo);
    }

}