import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.model';


@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);
  readonly data = inject<{user: User}>(MAT_DIALOG_DATA);
  form = {
    name: new FormControl(this.data.user.name),
    email: new FormControl(this.data.user.email),
    phone: new FormControl(this.data.user.phone),
    website: new FormControl(this.data.user.website),
  };

  cancel() {
    this.dialogRef.close();
  }

  get userWithUpdatedFields():{ name: string; email: string; phone: string; website: string } {
    return {
      name: this.form.name.value!,
      email: this.form.email.value!,
      phone: this.form.phone.value!,
      website: this.form.website.value!,
    };
  }

  save() {
    this.dialogRef.close({
      name: this.form.name.value,
      email: this.form.email.value,
      phone: this.form.phone.value,
      website: this.form.website.value,
    });
  }
}
