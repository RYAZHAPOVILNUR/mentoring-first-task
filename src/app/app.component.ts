import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mentoring-first-project';


  readonly headeritem1 = 'Каталог';

  readonly headeritem2 = 'О компании';

  readonly headeritem3 = 'Каталог';


  readonly header2item1 = 'Каталог'

  readonly header2item2 = 'Стройматериалы'

  readonly header2item3 = 'Инструменты'

  readonly header2item4 = 'Электрика'

  readonly header2item5 = 'Интерьер и одежда'

}
