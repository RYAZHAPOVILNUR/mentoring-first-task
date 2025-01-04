import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'customUpperCase',
  standalone: true,
  pure: true
})
export class CustomUpperCasePipe implements PipeTransform {
  transform(text: string): string {
    return text.toUpperCase();
  }
}
