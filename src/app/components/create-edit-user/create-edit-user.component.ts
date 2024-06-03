import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from "@angular/common";
import {User} from "@app/types/user.model";

export type DialogData = Pick<User, 'name' | 'email'>

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
    NgIf,
  ],
})
export class CreateEditUserComponent implements OnInit {
  public isEdit?: boolean;
  private readonly dialogRef: MatDialogRef<CreateEditUserComponent> = inject(MatDialogRef<CreateEditUserComponent>);
  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.patchValue({...this.data});
  }

  public onCreateEditUser(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
