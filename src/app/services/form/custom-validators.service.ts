import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class CustomValidatorsService {
    constructor() {}

    // Пример кастомного валидатора, проверяющего минимальную длину
    minLengthValidator(minLength: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const value = control.value;
            return value && value.length < minLength
                ? { minLength: { value: value, requiredLength: minLength } }
                : null;
        };
    }

    // Пример кастомного валидатора, проверяющего, является ли значение числом
    numberValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const value = control.value;
            return isNaN(value) ? { notANumber: { value: value } } : null;
        };
    }
}
