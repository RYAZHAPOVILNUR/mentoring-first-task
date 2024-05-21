import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { IUser } from '../types/users.interfase';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, MatError, MatFormFieldModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
  export class CreateEditUserComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    public readonly data:{user:IUser,isEdit: boolean} = inject(MAT_DIALOG_DATA);

    ngOnInit(): void {
      this.data.user ? this.usersFormBuilder.patchValue(this.data.user) : false;  
    }

    getFormControl(nameField:string):FormControl  {
      return this.usersFormBuilder.get(nameField) as FormControl
    }

    public readonly usersFormBuilder = this.fb.group({
      id:0,
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      website: ['', [Validators.required, Validators.minLength(3)]],
    })
}
