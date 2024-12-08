import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFormPhone',
  standalone: true
})
export class CustomFormPhonePipe implements PipeTransform {

  transform(text: string): string {
    return text.split('-').join('');
  }

}
