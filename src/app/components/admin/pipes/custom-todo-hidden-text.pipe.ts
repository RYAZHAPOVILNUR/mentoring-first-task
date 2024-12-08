import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTodoHiddenText',
  standalone: true
})
export class CustomTodoHiddenTextPipe implements PipeTransform {

  transform(text: string): string {
    return text.length > 20 ? text.slice(0, 20) + '...' : text;
  }

}
