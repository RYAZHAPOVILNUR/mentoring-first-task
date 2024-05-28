import {Component, inject, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface DialogData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-create-edit-user',
  templateUrl: 'create-edit-user.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
})
export class CreateEditUserComponent {

  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.group(<DialogData>{
    name: '',
    email: ''
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  field<T extends AbstractControl>(nameField: string): T {
    return this.form.get(nameField) as T;
  }

  ngOnInit() {
  }
}
