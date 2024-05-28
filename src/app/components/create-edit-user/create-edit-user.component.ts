import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface DialogData {
  description: string;
  animal: string;
  name: string;
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
  ],
})
export class CreateEditUserComponent {

  form: FormGroup | undefined;
  description: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      // ...
    });
  }
}
