import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../models/todos.model';

@Component({
  selector: 'app-create-edit-todo',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogClose],
  templateUrl: './create-edit-todo.component.html',
  styleUrl: './create-edit-todo.component.scss'
})
export class CreateEditTodoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEditTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {
    this.form = this.fb.group({
      userId: [data?.userId || '', [Validators.required, Validators.min(1)]],
      title: [data?.title || '', [Validators.required, Validators.minLength(3)]],
      completed: [data?.completed || false, Validators.required]
    });
  }

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close(null);
  }

  get formWithFields(): Todo {
    return {
      userId: this.form.value.userId,
      id: this.data?.id || new Date().getTime(),
      title: this.form.value.title,
      completed: this.form.value.completed === "true"
    }
  }
}
