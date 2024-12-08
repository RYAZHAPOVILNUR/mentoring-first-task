import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {User} from "../../users-list/users-list.component";
import {Todo} from "../todo-list.component";

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule,
        MatDialogClose
    ],
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss'
})
export class EditTodoDialogComponent {

  readonly data = inject<{todo: Todo}>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    title: new FormControl(this.data.todo?.title,[Validators.required,Validators.minLength(3)]),
    userId: new FormControl(this.data.todo?.userId,[Validators.required,Validators.pattern('^[0-9]+$')]),
    completed: new FormControl()
  });

  get fullInfoField(){
    return {
      id: this.data.todo?.id,
      ...this.form.value
    }
  }


}
