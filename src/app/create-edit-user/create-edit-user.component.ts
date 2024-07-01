import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnInit {
  //public isEdit?: boolean
  public data = inject(MAT_DIALOG_DATA)
  //public dialogRef = inject(MatDialogRef)
  public dialogRef: MatDialogRef<CreateEditUserComponent> = inject(MatDialogRef<CreateEditUserComponent>)
  private readonly fb = inject(FormBuilder)
  
  /*userForm = new FormGroup({
    id: new FormControl(this.data?.user?.id, [Validators.required]),
    name: new FormControl(this.data?.user?.name ?? '', [Validators.required]),
    username: new FormControl(this.data?.user?.username ?? '', [Validators.required]),
    phone: new FormControl(this.data?.user?.phone ?? '', [Validators.required]),
    email: new FormControl(this.data?.user?.email ?? '', [Validators.required, Validators.email])
  })*/

  userForm = this.fb.group({
    id: [new Date().getTime(), Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

  ngOnInit(): void {
    if (this.data.user) {
      this.userForm.patchValue(this.data.user)
    }
  }
  
  saveUser(): void {
    return this.dialogRef.close(this.userForm.value)
  }
}
