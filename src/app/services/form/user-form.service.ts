import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../_model/users';

@Injectable({
    providedIn: 'root',
})
export class UserFormService {
    constructor(private fb: FormBuilder) {}

    // Метод для создания формы на основе интерфейса User
    createUserForm(): FormGroup {
        return this.fb.group({
            id: [],
            name: ['', [Validators.required, Validators.minLength(3)]],
            userName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: this.fb.group({
                street: ['', Validators.required],
                suite: ['', Validators.required],
                city: ['', Validators.required],
                zipcode: ['', Validators.required],
                geo: this.fb.group({
                    lat: [''],
                    lng: [''],
                }),
            }),
            phone: ['', Validators.required],
            website: [''],
            company: this.fb.group({
                name: [''],
                catchPhrase: [''],
                bs: [''],
            }),
        });
    }

    // Метод для заполнения формы данными пользователя
    populateUserForm(user: User, form: FormGroup): void {
        form.patchValue(user);
    }
}
