import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import User from '../../interface/interface';
import { LocalStorageService } from '../../service/local-storage.service';

interface AddEditDialogData {
  isEdit: boolean,
  user: User
}

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: "./add-dialog.component.html",
  styleUrls: ["./add-dialog.component.scss"]
})
export class AddDialogComponent {
  formB = inject(FormBuilder);
  readonly data: AddEditDialogData = inject(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef<AddDialogComponent>);
  localStorageService = inject(LocalStorageService);
  
  form: FormGroup = this.formB.group({
    id: [this.data?.user?.id?? new Date().getTime(), Validators.required],//надо убрать id
    name: [this.data?.user?.name?? '', Validators.required],
    username: [this.data?.user?.username?? '', Validators.required],
    email: [this.data?.user?.email?? '', [Validators.required, Validators.email]],
    phone: [this.data?.user?.phone?? '', Validators.required],
  })

  onSaveButton() {
    if(this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}