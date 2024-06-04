import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/users';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'app-create-edit-user',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        NgComponentOutlet,
        MatSuffix,
        MatIconButton,
        MatButton,
    ],
    templateUrl: './create-edit-user.component.html',
    styleUrls: ['./create-edit-user.component.scss'],
})
export class CreateEditUserComponent implements OnInit, OnDestroy {
    userForm!: FormGroup;
    validForms: boolean = false;
    private subscriptions: Subscription = new Subscription();

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

        this.subscriptions.add(
            this.userForm.valueChanges.subscribe(() => {
                this.validForms = this.userForm.valid;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, ''); // Удаляем все нецифровые символы
        if (input.value.length > 12) {
            input.value = input.value.slice(0, 12);
        }
    }

    onBlur(field: string): void {
        const control = this.userForm.get(field);
        if (control && control.invalid && control.touched) {
            const errors = control.errors;
            if (errors) {
                if (errors['required']) {
                    this.toastr.error(`${field} не должно быть пустым`);
                }
                if (errors['minlength']) {
                    this.toastr.error(`${field} не может быть короче 3 символов`);
                }
                if (errors['email']) {
                    this.toastr.error(`Некорректный Email`);
                }
                if (errors['pattern']) {
                    this.toastr.error(`Некорректный формат телефона`);
                }
            }
        }
    }

    submitForm(): void {
        if (this.validForms) {
            this.dialogRef.close(this.userForm.value);
            console.log(this.userForm.value);
            this.toastr.success('Пользователь создан');
        } else {
            this.toastr.error('Форма содержит ошибки');
        }
    }

    testBuutton() {
        this.dialogRef.close({
            userName: 'ппавпаы',
            userEmail: 'ffff@dsd.ru',
            userPhone: '4745555555555',
        });
    }
}
