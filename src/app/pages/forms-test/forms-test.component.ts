import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { JsonPipe, NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-forms-test',
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
    ],
    templateUrl: './forms-test.component.html',
    styleUrl: './forms-test.component.scss',
})
export class FormsTestComponent implements OnInit, AfterViewInit {
    testForm!: FormGroup;
    testBoolean: boolean = false;
    isLoading = false;

    constructor(
        private elRef: ElementRef,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.testForm = this.fb.group({
            testName: ['', [Validators.required, Validators.minLength(3)]],
        });
    }
    async submitForm(): Promise<void> {
        if (this.testForm.invalid) {
            this.testForm.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        // Симуляция асинхронной проверки с задержкой
        await new Promise(resolve => setTimeout(resolve, 5000));
        this.isLoading = false;

        // Здесь можно добавить логику для обработки успешной проверки
        console.log('Form submitted successfully:', this.testForm.value);
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit called');
        const loadingElement = this.elRef.nativeElement.querySelector('.loading');

        if (loadingElement) {
            console.log('Element with class "loading" found');
            const text = loadingElement.textContent;
            loadingElement.innerHTML = '';

            const colors = [
                '#e74c3c',
                '#8e44ad',
                '#3498db',
                '#1abc9c',
                '#f1c40f',
                '#e67e22',
                '#2ecc71',
            ];

            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                span.style.setProperty('--i', i.toString());
                span.style.color = colors[i % colors.length];
                loadingElement.appendChild(span);
            }
        } else {
            console.error('Element with class "loading" not found.');
        }
    }

    // onTouched() {
    //     this.testBoolean = true;
    //     if (this.testBoolean) {
    //         this.toastr.success('onTouched', 'Success', {
    //             positionClass: 'toast-top',
    //             progressBar: true,
    //         });
    //     }
    // }

    onNoClickButton() {
        this.testForm.reset();
        this.testBoolean = false;
    }
}
