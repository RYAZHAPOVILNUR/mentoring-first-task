import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  model,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../interface/users-interface';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogClose],
})
export class EditUserDialog {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);

  @Output()
  public form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [this.data.user.name, Validators.required],
      email: [this.data.user.email, Validators.required],
      website: [this.data.user.website, Validators.required],
      companyName: [this.data.user.company.name, Validators.required],
    });
  }

  get userWithUpdatedFields(): { user: User } {
    return {
      ...this.form.value,
      id: this.data.user.id,
    };
  }
}
