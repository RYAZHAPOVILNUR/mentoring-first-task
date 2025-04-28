import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, NgIf, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogModule
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserDialogComponent {
    constructor(private dialogRef: MatDialogRef<CreateUserDialogComponent>) {}

    createForm = new FormGroup ({
        id: new FormControl(new Date().getTime()),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        website: new FormControl('', [Validators.required, Validators.minLength(4)]),
        company: new FormGroup ({
            name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        })
    });

    onSubmit() {
        if (this.createForm.valid) {
            this.dialogRef.close(this.createForm.value);
        }
    }

    onCancel() {
        this.dialogRef.close(false);
    }
}
