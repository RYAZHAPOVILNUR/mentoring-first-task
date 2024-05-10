import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent {
  constructor(public dialogRef: MatDialogRef<CreateEditUserComponent>, @Inject(MAT_DIALOG_DATA) private data:any) {
    if (this.data) {
      this.isNewUser = false;
    }

    console.log('data', data);
  }

  public isNewUser: boolean = true;
  public submitted: boolean = false;

  public form = new FormGroup({
    name: new FormControl(this.data?.name ?? '', Validators.required),
    username: new FormControl(this.data?.username ?? '', Validators.required),
    email: new FormControl(this.data?.email ?? '', [Validators.required, Validators.email])
  })

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      console.log('Form is valid', this.data);

      const newData = {
        id: this.data?.id ?? Number(new Date()),
        name: this.form.value.name ?? '',
        username: this.form.value.username ?? '',
        email: this.form.value.email ?? ''
      }

      this.dialogRef.close(newData);
    } else {
      console.log('Form is invalid');
    }
  }
}
