import { NgFor } from "@angular/common";
import { Component,EventEmitter,Input,Output } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-todo-card',
    templateUrl:'./todo-card.component.html',
    styleUrls:['./todo-card.component.scss'],
    standalone: true,
    imports: []

})
export class TodoCardComponent {
    @Input() 
    todo: any

//     @Output()
//      deleteTodo = new EventEmitter();

//      onDeleteTodo(todoId: number) {
//          this.deleteTodo.emit(todoId);
// }
}