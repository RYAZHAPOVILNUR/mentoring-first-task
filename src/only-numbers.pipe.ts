import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyNumbers',
  standalone: true
})
export class OnlyNumbersPipe implements PipeTransform {

  transform(value: string): string {
    return value.split('').filter(char => char >= '0' && char <= '9').join('');
  }
}
