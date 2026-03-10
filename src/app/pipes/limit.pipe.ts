import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
  standalone: true,
})

export class LimitTitlePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    if (!value) return '';
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
