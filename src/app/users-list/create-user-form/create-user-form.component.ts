import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss',
  imports: [ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  public onCreateUser(): void {
    this.createUser.emit(this.form.value);
  }

  @Output()
  createUser = new EventEmitter();

  public form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      website: [null, Validators.required],
      companyName: [null, Validators.required],
    });
  }
}
