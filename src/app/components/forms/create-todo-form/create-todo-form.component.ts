import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponents {
  
  @Output()
  createTodo = new EventEmitter();

  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      userId: [null, [Validators.required]],
      id: [null, [Validators.required]],
      title: [null, [Validators.required]],
      completed: [null, [Validators.required]],
    });
  }
  
  onCreateTodo() {
    this.createTodo.emit(this.form.value);
  }
  
}
