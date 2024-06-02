import { Component, ElementRef } from '@angular/core';
import { CommonModule, NgComponentOutlet, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatrixComponent } from '../components/matrix/matrix.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-display-view',
    standalone: true,
    imports: [
        NgStyle,
        NgComponentOutlet,
        FormsModule,
        CommonModule,
        MatCardModule,
        MatrixComponent,
    ],
    templateUrl: './display-view.component.html',
    styleUrls: ['./display-view.component.scss'],
})
export class DisplayViewComponent {
    displayComponent = MatrixComponent;
    width = 900;
    height = 600;
    scale = 0.5;

    constructor(private elRef: ElementRef) {}
}
