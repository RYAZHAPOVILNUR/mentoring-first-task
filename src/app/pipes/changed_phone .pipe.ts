import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changed_phone',
  standalone: true,
})
export class ChangedPhonePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? value.replace(/\D/g, '') : '';
  }
}
