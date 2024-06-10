import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/users';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe, NgClass, NgComponentOutlet } from '@angular/common';

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
        JsonPipe,
    ],
    templateUrl: './create-edit-user.component.html',
    styleUrls: ['./create-edit-user.component.scss'],
})
export class CreateEditUserComponent implements OnInit, OnDestroy {
    userForm!: FormGroup;
    formControlNameUserNameError!: string;
    formControlNameEmailError!: string;
    formControlNamePhoneError!: string;
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
            email: ['', [Validators.required, Validators.email]],
            phone: ['+7', [Validators.required]],
        });

        if (this.data) {
            this.userForm.patchValue({
                userName: this.data.userName,
                email: this.data.email,
                phone: this.data.phone,
            });
        }

        if (this.data) {
            this.userForm.patchValue({
                userName: this.data.userName,
            });
        }

        //Получаем все имена контролов формы
        // Подписка на изменения значения в полях формы
        if (Object.keys(this.userForm.getRawValue())) {
            const controlNames = Object.keys(this.userForm.getRawValue());
            controlNames.forEach(controlName => {
                const control = this.userForm.get(controlName);
                control?.valueChanges.subscribe(value => {
                    this.formControlNameUserNameError = '';
                    this.formControlNameEmailError = '';
                    this.formControlNamePhoneError = '';
                    const error: ValidationErrors | null = control.errors;
                    for (let errorKey in error) {
                        switch (controlName) {
                            case 'userName':
                                this.formControlNameUserNameError =
                                    this.handlerValidatorsErrors(errorKey);
                                break;
                            case 'email':
                                this.formControlNameEmailError =
                                    this.handlerValidatorsErrors(errorKey);
                                break;
                            case 'phone':
                                this.formControlNamePhoneError =
                                    this.handlerValidatorsErrors(errorKey);
                                break;
                        }
                        this.handlerValidatorsErrors(errorKey);
                    }
                });
            });
        } else {
            console.error('Контрол "name" не найден в форме');
        }
    }

    handlerValidatorsErrors(errorName: string): string {
        switch (errorName) {
            case 'required':
                return 'Обязательное поле';
            case 'minlength':
                return 'Минимальная длина 3 символа';
            case 'email':
                return 'Не корректный Email';
            default:
                return '';
        }
    }

    submitForm(): void {
        if (this.userForm.valid) {
            const user: User = {
                ...this.data,
                ...this.userForm.value,
            };
            this.dialogRef.close(user);
            if (this.data) {
                this.toastr.success('Пользователь Сохранен');
            } else {
                this.toastr.success('Пользователь создан');
            }
        } else {
            this.toastr.error('Форма содержит ошибки');
        }
    }
    onCancelClick() {
        this.userForm.reset(); // Сбросить состояние формы до начального
        this.dialogRef.close(); // Закрыть диалоговое окно
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
