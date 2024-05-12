import { Component, OnInit, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-edit-user',
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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);

  private readonly formBuilder = inject(FormBuilder);
  public formnameControl!: FormGroup;
  public isEdit: boolean = false;

  ngOnInit(): void {
    this.formnameControl = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^.+/)]],
      email: ['', [Validators.required, Validators.pattern(/^.+/)]],
      phone: ['', [Validators.required, Validators.pattern(/^.+/)]]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createEditUser(): void {
    if (this.dialogRef.componentInstance.formnameControl.status === "INVALID") {
      alert('Введите корректные данные!');
      return;
    } else {
      this.dialogRef.close();
    }
  }
}

