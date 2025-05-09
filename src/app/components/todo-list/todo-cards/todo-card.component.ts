import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Todo } from '../../../Interfaces/todo-interface';
import { MinLengthPipe } from '../../../pipes/min-lenght-pipe';


@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true,
  imports: [MinLengthPipe],
})
export class TodoCardComponent {
    
  @Input()
  todo!: Todo;

  @Output()
  deleteTodo = new EventEmitter();

  onDeleteTodo(todo: string) {
    this.deleteTodo.emit(todo);
  }
}
