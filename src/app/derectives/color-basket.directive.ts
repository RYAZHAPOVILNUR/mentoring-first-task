import {
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[colorBasket]',
  standalone: true
})
export class ColorBasketDirective {
  textColor: string = '#f0ba4e'
  color: string = '#333946'

  @HostBinding('style.color')
  get colorGetter(): string {
    return this.textColor;
  }

  @HostBinding('style.backgroundColor')
  get backgroundColor(): string {
    return this.color;
  }

  @HostListener('mouseenter')
  enter(): void {
    this.color = '#f0ba4e'
    this.textColor = '#333946'
  }

  @HostListener('mouseleave')
  leave(): void {
    this.color = '#4c565f';
    this.textColor = '#f0ba4e'
  }

}
