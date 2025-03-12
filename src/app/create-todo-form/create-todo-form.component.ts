import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
export function completedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.trim().toLowerCase();
        if (value === "da" || value === "net" || value === "нет" || value === "да") {
            return null;
        }
        return { invalidCompleted: true };
    };
}

@Component({
    selector: 'app-create-todo-form',
    templateUrl: './create-todo-form.html',
    styleUrls: ['./create-todo-form.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf,MatInputModule,MatFormFieldModule,MatButtonModule,MatIconModule]
})
export class CreateTodoForm {
    @Output()
    createTodo = new EventEmitter();

    public formTodo = new FormGroup({
        title: new FormControl("", [Validators.required, Validators.minLength(3)]),
        userId: new FormControl("", [Validators.required,  Validators.minLength(1)]),
        completed: new FormControl("", [Validators.required, completedValidator()]),
    });

    private getCompletedValue(): boolean {
        const value = this.formTodo.get('completed')?.value!.trim().toLowerCase();
        if (value === "да")
            return true;
        else return false;
    }

    public submitForm(): void {
        this.createTodo.emit({ ...this.formTodo.value, completed: this.getCompletedValue() });
        this.formTodo.reset();
    }
}