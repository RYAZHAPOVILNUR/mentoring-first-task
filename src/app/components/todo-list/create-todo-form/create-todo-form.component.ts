import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {Todo} from "../todo-list.component";

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, MatButtonModule, MatDialogClose],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
  readonly data = inject<{todo: Todo}>(MAT_DIALOG_DATA);


  public form = new FormGroup({
    title: new FormControl(this.data.todo.title,[Validators.required,Validators.minLength(3)]),
    userId: new FormControl(this.data.todo.userId,[Validators.required,Validators.pattern('^[0-9]+$')]),
    completed: new FormControl()
  })

  get infoTodo(){
    return this.form.value;
  }
}
