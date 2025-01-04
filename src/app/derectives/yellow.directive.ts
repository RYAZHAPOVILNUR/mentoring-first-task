import {
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[yellow]',
  standalone: true
})
export class YellowDirective {
  color: string = '#333947';
  textTransform: string = 'lowerCase';

  @HostBinding('style.backgroundColor')
  get backgroundColor(): string {
    return this.color;
  }

  @HostBinding('style.textTransform')
  get textTransformGetter(): string {
    return this.textTransform;
  }

  @HostListener('mouseenter')
  enter(): void {
    this.color = 'red'
    this.textTransform = 'upperCase';
  }

  @HostListener('mouseleave')
  leave(): void {
    this.color = 'dimgray'
    this.textTransform = 'lowerCase';
  }
}
