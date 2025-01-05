import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { User } from '../../../interfaces/User.interface';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  public IsEdit = this.data.isEdit;

  public form = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl(this.data.email, [
      Validators.required,
      Validators.email,
    ]),
    website: new FormControl(this.data.website, [
      Validators.required,
      Validators.minLength(4),
    ]),
    companyName: new FormControl(this.data.company.name, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  get userWithUpdatedFields() {
    if (this.data.isEdit) {
      return {
        ...this.form.value,
        id: this.data.id,
        isEdit: this.IsEdit,
      };
    } else {
      return {
        ...this.form.value,
        id: new Date().getTime(),
        isEdit: this.IsEdit,
      };
    }
  }
}
