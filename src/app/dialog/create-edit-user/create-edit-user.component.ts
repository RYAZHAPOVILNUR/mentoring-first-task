import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User, isEdit: boolean}) {}

  public myFormGroup = new FormGroup({
    id: new FormControl<string | number>(''),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl<string | number>('', Validators.required),
    company: new FormGroup ({
      name: new FormControl('', Validators.required)
    }),
  });

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.myFormGroup.patchValue(this.data.user);
    }
  }

  public onSubmit(): void {
    if (this.myFormGroup.valid) {
      this.dialogRef.close(this.myFormGroup.value);
    } 
  }

  public onClosed(): void {
    this.dialogRef.close();
  }
}
