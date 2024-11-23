import {Directive, ElementRef, HostBinding, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[appRedDirectiveJs]',
  standalone: true
})
export class RedDirectiveJsDirective {

  color = 'purple'
  textTransform = 'LowerCase'

  @HostBinding('style.backgroundColor')
  get backGroundColor() {
    return this.color
  };

  @HostBinding('style.textTransform')
  get transformCase(){
    return this.textTransform;
  }

  @HostListener('mouseenter')
  enter(): void {
    this.color = 'orange';
    this.textTransform = 'UpperCase';
  }

  @HostListener('mouseleave')
  leave(): void {
    this.color = 'purple';
    this.textTransform = 'LowerCase';
  }
}
