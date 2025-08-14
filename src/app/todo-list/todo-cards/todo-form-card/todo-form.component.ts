import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class TodoFormComponent {
  public todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.todoForm = this.formBuilder.group({
      userId: [null, Validators.required],
      id: [null, Validators.required],
      title: [null, Validators.required],
      completed: [null, Validators.required],
    });
  }

  @Output()
  createTodo = new EventEmitter();

  onCreate(){
    this.createTodo.emit(this.todoForm.value);
  }
}
