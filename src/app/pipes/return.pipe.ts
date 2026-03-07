import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'return',
    standalone: true,
})

export class RemoveDashesPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) {
            return '';
        }
        return value.replace(/\D/g, '')
    }
}