import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule
],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent {

  readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly user = this.data.user
  isEdit = false;

  cretaeEditForm!: FormGroup;

  ngOnInit() {
    this.cretaeEditForm = new FormGroup({
      id: new FormControl(this.data?.id || null),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      website: new FormControl(''),
      phone: new FormControl('', Validators.pattern('[1-9]{6,10}')),
    });
    if (this.data.user) {
      this.isEdit = true;
      this.loadUserData();
    }
  }

  loadUserData() {
    this.cretaeEditForm.patchValue(this.user)
  }

  onSubmitForm():void {
    this.dialogRef.close();
  }

  onNoClickForm(): void {
    this.dialogRef.close();
  }

}
