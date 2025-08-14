import { Component, EventEmitter, Input, Output } from "@angular/core";



@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    imports: [],
    standalone: true,
})

export class TodoCardComponent{

    @Input()
    todo: any;

    @Output()
    onDelete = new EventEmitter();

    onDeleteTodo(id: number){
        this.onDelete.emit(id)
    }

    }
    
