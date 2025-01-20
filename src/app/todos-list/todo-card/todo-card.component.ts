import { Component, Input, Output, EventEmitter } from "@angular/core";
import {NgFor} from "@angular/common";
import { TodosService } from "../../todos.service";



@Component({
    selector: "app-todo-card",
    templateUrl: "./todo-card.component.html",
    styleUrls: ["./todo-card.component.scss"],
    standalone : true,
    imports: [NgFor]
})

export class TodoCardComponent {
    @Input()
    todo: any

    @Output()
    deleteTodo = new EventEmitter();

    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId);
    }
}
