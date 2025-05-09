import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'minLengthPipe',
    standalone: true,   
})

export class MinLengthPipe implements PipeTransform{
    transform(text: string): string {
     if(text.length < 20){
        return text;
     }return text.substring(0, 21);
    }
   
}