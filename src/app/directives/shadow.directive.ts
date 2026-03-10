import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[shadow]',
  standalone: true,
})
export class ShadowDirective {
  boxShadow: string = '';

  @HostBinding('style.boxShadow')
  get backgroundColor(): string {
    return this.boxShadow;
  }

  @HostListener('mouseenter')
  onboxShadow(): void {
    this.boxShadow = '5px 5px 2px rgb(63, 56, 56)';
  }

  @HostListener('mouseleave')
  offboxShadow(): void {
    this.boxShadow = '';
  }
}
