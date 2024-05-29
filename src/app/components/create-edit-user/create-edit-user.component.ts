import {Component, inject, Inject, OnInit} from '@angular/core';
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
import {NgIf} from "@angular/common";
import {User} from "../../types/user.model";

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

  isEdit?: boolean;
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.group(<DialogData>{
    name: '',
    email: ''
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
  ) {
  }

  ngOnInit() {
    this.form.patchValue({...this.data});
  }

  field<T extends AbstractControl>(nameField: string): T {
    return this.form.get(nameField) as T;
  }

  onCreateEditUser() {
    this.dialogRef.close(this.form.value);
  }
}
