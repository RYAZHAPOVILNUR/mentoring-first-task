import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-matrix',
    standalone: true,
    imports: [],
    templateUrl: './matrix.component.html',
    styleUrl: './matrix.component.scss',
})
export class MatrixComponent implements AfterViewInit {
    private matrixColor = '#c4c9e4';
    constructor(private router: Router) {}

    @ViewChild('matrixCodeSpace', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
    private matrixContext!: CanvasRenderingContext2D;
    private width!: number;
    private height!: number;
    private columns!: number;
    private yPosition!: number[];

    ngAfterViewInit(): void {
        this.setupCanvas();
        setInterval(() => this.matrix(), 50);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.setupCanvas();
    }

    private setupCanvas(): void {
        const canvas = this.canvasRef.nativeElement;
        this.matrixContext = canvas.getContext('2d')!;
        this.width = canvas.width = canvas.parentElement!.clientWidth;
        this.height = canvas.height = canvas.parentElement!.clientHeight;
        this.matrixContext.fillStyle = '#000';
        this.matrixContext.fillRect(0, 0, this.width, this.height);
        this.columns = Math.floor(this.width / 20) + 1;
        this.yPosition = Array(this.columns).fill(0);
    }

    private matrix(): void {
        this.matrixContext.fillStyle = '#0001';
        this.matrixContext.fillRect(0, 0, this.width, this.height);
        this.matrixContext.fillStyle = this.matrixColor;
        this.matrixContext.font = '15pt monospace';

        this.yPosition.forEach((y, index) => {
            const text = String.fromCharCode(Math.random() * 128);
            const x = index * 20;
            this.matrixContext.fillText(text, x, y);
            if (y > this.height + Math.random() * 10000) {
                this.yPosition[index] = 0;
            } else {
                this.yPosition[index] = y + 20;
            }
        });
    }

    matrixColorRandom() {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.matrixColor = randomColor;
    }

    redirecTo() {
        this.router.navigate(['/users']);
    }
}
