import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[cart]',
  standalone: true,
})
export class CartDirective {
  color: string = '';

  @HostBinding('style.backgroundColor')
  get backgroundColor(): string {
    return this.color;
  }

  @HostListener('mouseenter')
  enter(): void {
    this.color = '#f0ba4e';
  }
  @HostListener('mouseleave')
  leave(): void {
    this.color = '';
  }
}
