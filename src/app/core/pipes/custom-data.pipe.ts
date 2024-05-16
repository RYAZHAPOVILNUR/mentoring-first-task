import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: number): string {
    const date = new Date(value);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU');
  }
}
