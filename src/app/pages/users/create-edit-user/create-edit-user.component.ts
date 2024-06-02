import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/users';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { JsonPipe, NgClass, NgComponentOutlet } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatrixComponent } from '../../components/matrix/matrix.component';

@Component({
    selector: 'app-create-edit-user',
    standalone: true,
    imports: [
        MatFormField,
        MatButton,
        MatInput,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatIcon,
        JsonPipe,
        ReactiveFormsModule,
        NgClass,
        NgComponentOutlet,
    ],
    templateUrl: './create-edit-user.component.html',
    styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent implements OnInit {
    userForm!: FormGroup;
    formValid: boolean = false;
    inputValue: string[] = [];

    constructor(
        public dialogRef: MatDialogRef<CreateEditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.userForm = this.fb.group({
            userName: ['', [Validators.required, Validators.minLength(3)]],
            userEmail: ['', [Validators.required, Validators.email]],
            userPhone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        });
    }

    onInput(event: Event): void {
        console.log('phone', (event.target as HTMLInputElement).value.length);
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, ''); // Удаляем все нецифровые символы
        if (input.value.length > 10) {
            input.value = input.value.slice(0, 10);
        }
    }

    checkFormTouched() {
        console.log('value');
        this.userForm.get('userName')?.valueChanges.subscribe(value => {
            const errors = this.userForm.get('userName')?.errors;
            if (errors) {
                if (errors['required']) {
                    this.inputValue.push('Имя не должно быть пустым');
                    this.checkFormErrors();
                }
                if (errors['minlength']) {
                    this.toastr.error('Имя не может быть короче 3 символов');
                }
            }
        });
    }

    checkFormErrors() {
        if (!this.userForm.invalid) {
            this.formValid = true;
            return;
        }
        this.inputValue.forEach(value => {
            this.toastr.error(value);
        });
    }

    onNoClick(): void {
        if (this.formValid) {
            this.dialogRef.close(this.userForm.value);
        }
        this.dialogRef.close();
    }

    protected readonly displayComponent = MatrixComponent;
}
