import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

const aboutCompani = (text: string) => console.log(text);

aboutCompani('О компании');

const names = ['Ilnur', 'Farukh', 'Sveta', 'Dmitry']

// names.forEach (
//   (name)=> {
//     console.log(name)
//   }
// )

// const time = new Date().getTime();

// console.log('time:', time)

// if (time === 1729677473756) {
//   console.log('time is correct')
// } else {
//   console.log('ERROR')
// }

const newPages = [5, 4, 3, 2, 1]


const upperCaseNames = names.map (
  (name) => {
    console.log(name.toUpperCase());
    return name.toUpperCase();
  }
)


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'mentoring-first-project';

  isShowImg = true;

  readonly newPages = newPages;

}
