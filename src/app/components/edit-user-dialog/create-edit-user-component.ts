import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../user-list-component/user-list.component';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './create-edit-user-component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CreateEditUserDialogComponent implements OnInit {
  private readonly dialogRef = inject(
    MatDialogRef<CreateEditUserDialogComponent>
  );
  public data = inject<{ user: User; isEdit: boolean }>(MAT_DIALOG_DATA);

  public readonly form = new FormGroup({
    id: new FormControl(new Date().getTime(), Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    company: new FormGroup({
      name: new FormControl('', Validators.required),
    }),
  });
  ngOnInit(): void {
    if (this.data.isEdit) {
      this.form.patchValue(this.data.user);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }
}
