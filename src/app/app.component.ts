import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';

  headerTop1Item1 = "Главная";
  headerTop1Item2 = "О компании";
  headerTop1Item3 = "Каталог";

  headerTop2Item1 = "Каталог";
  headerTop2Item2 = "Стройматериалы";
  headerTop2Item3 = "Инструменты";
  headerTop2Item4 = "Электрика";
  headerTop2Item5 = "Интерьер и одежда";
}
