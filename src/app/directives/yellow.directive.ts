import { Directive, ElementRef, inject } from "@angular/core";

@Directive({
    selector: '[yellow]',
    standalone: true,
})

export class YellowDirective{
    
    private readonly elementRef = inject(ElementRef);
    
    constructor() {
        this.elementRef.nativeElement.style.backgroundColor = 'yellow'
    }
    
}